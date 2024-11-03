---
tags: 
  - post
  - maps
date: 2024-11-04
title: Sparsely Supported Locale Matching
process: maps
---
# Sparsely Supported Locale Matching

Internationalization requires translations for all the locales you want to support. Therefore, if an individual string is missing a translation for a supported locale it is a bug.
For example, you request a site in German but find an English menu item "New Products." The page was added recently and will be translated soon because they want to support German. 

However if you open google maps in German and browse rural Taiwan, there will be untranslated text. For clarity, in this scenario *transliteration* is often more valuable and google typically displays this alongside local text.
When **only local text is available** it is correct to display it. What if there are variations available but not exactly what the user prefers?

## Locale Matching

known problem

icu::LocaleMatcher

https://www.npmjs.com/package/@phensley/locale-matcher

CLDR

complexity of mixed data sources -- icu addLikelySubtags() [automatic in icu::LocaleMatcher]

unknown default language -- lead to current, temporary solution
