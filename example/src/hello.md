---
title: 'vue-markdown-loader example'
lang: zh-CN
---

# vue-markdown-loader example

[[toc]]

## hello world!

## paragraph

Hello, **vue-markdown-loader** is powerful.

Enjoy coding!

## table

| left | center | right |
| :--- | :----: | ----: |
| aaaa | bbbbbb | ccccc |
| a    | b      | c     |

## list

- unordered list
- unordered list
- unordered list
- unordered list
- unordered list

1. ordered list
1. ordered list
1. ordered list
1. ordered list
1. ordered list

## code highlight

```javascript
let a = 1
let b = 2

console.log(a + b)
```

```bash
yarn add vue-markdown-loader
```

```php{1,3}
$msg = 'hello world';

var_dump($msg);
```

```diff
- let a = 'hello'
+ let a = 'hello world'
```

## emoji

:smile: :+1:

## custom block

::: tip
Hello, thanks for using vue-markdown-loader.
:::

::: danger STOP
Danger zone!
:::

## toc h2

test content

### toc h3 first

hello

### toc h3 second

hello
