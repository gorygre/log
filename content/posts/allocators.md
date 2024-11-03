---
tags: 
  - post
  - c++
date: 2024-11-04
title: Monitoring Standard Library Allocations
process: c++
---
# Monitoring Standard Library Allocations

Consider the task of creating a plain array in C++. Three valid options come to mind.

* Manual memory allocation with a call to `malloc()`
* For type safety, calling constructors, and operator overloading, use `operator new`
* Use a smart pointer to `std::array`

```cpp
int* array = malloc(10 * sizeof(int));
int* array = new int[10];
auto array = std::make_unique<std::array<int, 10>>();
```

Each option has its own justification especially if we generalize from `int` to any type.

# The Allocator Named Requirement

[Allocator](https://en.cppreference.com/w/cpp/named_req/Allocator)
is the stdlib's memory management abstraction. It is used extensively with a few notable and frustrating exceptions.
First, let's look at the good stuff using `std::vector` as an example.

## How does `std::vector` allocate memory?
`std::allocator` is passed as a default template argument to `std::vector` so the first step is define our own Allocator.
