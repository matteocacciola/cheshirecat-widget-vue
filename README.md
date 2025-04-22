# Vue Chat Widget 🐱

Version: **1.1.0**

Vue chat widget for the Cheshire Cat, ready to be used on any website.

[TypeScript API Client](https://github.com/matteocacciola/cheshirecat-typescript-client)

## How to import

Load the files in the `<head>` tag, like this:

```html
<script type="module" crossorigin src="/dist/widget.js"></script>
<link rel="stylesheet" href="/dist/widget.css">
```

or if you prefer, you can load them using the CDN:

```html
<script type="module" crossorigin src="https://cdn.jsdelivr.net/gh/matteocacciola/cheshire-widget-vue@main/dist/widget.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/matteocacciola/cheshire-widget-vue@main/dist/widget.css">
```

And then you can import the widget (a parent div with fixed size is suggested):

```html
<div class="w-96 h-96 m-auto">
    <cheshire-cat-chat id="cat-chat" />
</div>
```

## Cookies

In order to use the widget, you need to set some cookies in your browser. The cookies are:
- `ccat_user_token`: the token used to authenticate the user
- `ccat_agent_id`: the id of the agent that will be used to send the messages
- `ccat_user_id`: the id of the user that will be used to send the messages

Starting from version 0.12.1, the API supports JWT token authentication. Therefore, you can configure the widget to use
a token by setting the `ccat_user_token` property.
If you prefer to use API key authentication, you can set the `ccat_user_token` property to the API key.

The `ccat_user_token` will be automatically included in all API requests and WebSocket connections.

## Attributes

The widget attribute is only one: `settings`. You should set it via JavaScript like in the following example.
The available widget settings properties are:

| Attribute   | Type      | Default value                                                                                                                 | Description                                                                          |
|:------------|:----------|:------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------|
| host        | String    | `localhost`                                                                                                                   | The hostname where the Cheshire Cat is running.                                      |
| port        | Number    | `1865`                                                                                                                        | The port on which the Cheshire Cat is running.                                       |
| dark        | Boolean   | `false`                                                                                                                       | `true` if the chat have to use the dark mode. `false` if not.                        |
| why         | Boolean   | `false`                                                                                                                       | `true` if the chat have to show the WHY button in the CCat response. `false` if not. |
| thinking    | String    | `Cheshire Cat is thinking...`                                                                                                 | The text to visualize while the CCat answer is loading.                              |
| placeholder | String    | `Ask the Cheshire Cat...`                                                                                                     | The text to visualize in the input placeholder.                                      |
| primary     | String    | `#F3977B`                                                                                                                     | The color to use to stylize the chat.                                                |
| callback    | String    | `undefined`                                                                                                                   | The function to call before passing the message to the cat.                          |
| defaults    | String[]  | **Check** [defaultMessages](https://github.com/matteocacciola/cheshirecat-widget-vue/blob/main/src/stores/useMessages.ts#L14) | The default messages to show before starting the conversation with the cat.          |
| features    | Feature[] | **Check** [Features](https://github.com/matteocacciola/cheshire-widget-vue/blob/main/src/config.ts#L5)                        | The features that the user can use.                                                  |

## Configuration Example

A complete configuration example:

```html
<div class="w-96 h-96 m-auto">
    <cheshire-cat-chat id="cat-chat" />
</div>
<script>
    const catChat = document.querySelector("#cat-chat")

    catChat.settings = {
        host: 'localhost',
        port: 1865,
        callback: (message) => {
            console.log("Callback called.")
            return `Let's have a chat. ${message}`
        },
        defaults: ['Is everything ok?', 'Who are you?', 'What time is it?', 'What\'s up?', 'Hello Cheshire Cat!'],
        features: ['record', 'web', 'file', 'reset']
    }
</script>
```

## Events

You also have access to some events:

```js
catChat.addEventListener("message", ({ detail }) => {
    console.log("Message:", detail.text)
})

catChat.addEventListener("upload", ({ detail }) => {
    console.log("Uploaded content:", detail instanceof File ? detail.name : detail)
})

catChat.addEventListener("notification", ({ detail }) => {
    console.log("Notification:", detail.text)
})
```

The available events are:

| Event         | Response           | Description                                                                                               |
|:--------------|:-------------------|:----------------------------------------------------------------------------------------------------------|
| message       | `Message`          | Return the message every time a new one is dispatched.                                                    |
| upload        | `File` / `string`  | Return the uploaded content every time a new one is dispatched. It can be either a file object or a url.  |
| notification  | `Notification`     | Return the notification every time a new one is dispatched.                                               |

## Build

The compilation generates a `dist` folder, which contains the compiled files and a simple example of how to integrate the widget in an html page.

To compile the widget, run the following command:

```bash
npx vite build
```

## Development build

To build in debug mode, not minifying the JavaScript, run the following command:

```bash
npm run build-dev
```

```bash
npx vite build --minify false --sourcemap --outDir dist-dev
```

this will generate an `dist-dev` folder with the compiled files and a simple example of how to integrate the widget in a html page.
In this case, the `widget.js` file is not minified and can be debugged in the browser

## build both dist and dist-node

To build both the `dist` and `dist-dev` folders, run the following command:

```bash
npm run build-all
```
