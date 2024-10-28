import pluginWebc from "@11ty/eleventy-plugin-webc";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { JSDOM } from "jsdom";
import Prism from "prismjs";
import mermaid from "@kevingimbel/eleventy-plugin-mermaid";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./_components/**/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});

	eleventyConfig.addPlugin(syntaxHighlight);

	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	eleventyConfig.addPlugin(mermaid, {
		extra_classes: 'graph',
	});

	eleventyConfig.amendLibrary("md", (mdLib) => {
		var defaultFence = mdLib.renderer.rules.fence || function (tokens, idx, options, env, self) {
			return self.renderToken(tokens, idx, options);
		};

		mdLib.renderer.rules.fence = function (tokens, idx, options, env, self) {
			const code = defaultFence(tokens, idx, options, env, self);
			if (code.includes('mermaid')) {
				// don't wrap mermaid with dashes
				return code;
			}

			// render the code block to get only the text
			const dom = new JSDOM();
			const div = dom.window.document.createElement('div');
			div.innerHTML = code;
			const text = div.firstChild.textContent;

			let maxWidth = 0;
			let height = 0;
			for (const line of text.split('\n')) {
				maxWidth = Math.max(maxWidth, line.length);
				height++;
			}
			
			const columnsLeft = '<div>' + '| <br>'.repeat(height - 1) + '| </div>'
			const columnsRight = '<div>' + ' |<br>'.repeat(height - 1) + ' |</div>'
			const modifier = (maxWidth % 2 === 0) ? 1 : 0;
			const dashes = ' -'.repeat((maxWidth - modifier + 4) / 2);

			return '<div class="box">' + dashes + '<div style="display: flex;">' + columnsLeft + code + columnsRight + '</div>' + dashes + '</div>';
		};

		mdLib.renderer.rules.code_inline = (tokens, idx, { langPrefix = '' }) => {
			  const token = tokens[idx];
			  const highlight = Prism.highlight(token.content, Prism.languages.clike, 'cpp');
			  return `<code class="${langPrefix}">${highlight}</code>`;
		};
	});

	return {
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
		},
	}
};
