# OChat Widget


This widget allows you to host your bot on any website. You can also customize the look and feel of this widget.

## Setting Up the Development Server
- Run `npm run serve` to start the development server and then navigate to the Blank example (located at `http://localhost:8089/Blank`).
- Run `npm run build` to create the `dist` folder for the Blank and JET Work Better example apps so that they can be distributed to other servers.

## Setting Up the Bots Chat Server
Refer to the Bot Chat Server  [README file](/source/apps/chat/README.md).

## Configuring the Widgets
You can change the look and feel of the widgets using the following parameters in the `settings.js` file.

- `uri` - The Bots Chat Server URI.
- `channel` - The bot channel ID.
- `userId` - The Bots Chat Server ID.
- `isDebugMode` - Enables or disables logging. By default, this is set to `false`.
- `chatTitle` - The title of the chat.
- `miniTitle` - The title of the chat when minimized.
- `chatInputPlaceholder` - The placeholder text. By default, it's "Message".
- `robotIcon` - An optional URL or base64 format icon that's used for the bot's profile picture.
- `personIcon` - An optional URL or base64 format icon for user's profile picture.
- `closeIcon` - An optional URL or base64 format icon for the Close button.
- `sendIcon` - An optional URL or base64 format icon for the Send button.
- `openIcon` - An optional URL or base64 format icon for the Open button.
- `position` - The position of the widget. By default, this position is: bottom: 0, left 20px.
- `position.left` - This can't be used in combination with "right".
- `position.right` - This can't be used in combination with "left".
- `position.top` - This can't be used in combination with "bottom".
- `position.bottom` - This can't be used in combination with "top".
- `useCustomStyle` - Enables or disables the custom styling. By default, this is set to `false`. When you set this flag to `true`, you prevent the widget from loading the default style. It instead relies on custom styles.
- `embeddedVideo` - Enable or disable video links embedding

## Installing the Widgets
Create a configuration file and include this file to the `index.html`:


    <script src="settings.js"></script>

Include the widget script to the `index.html` project:

    <script src="lib/ochat-widget.min.js"></script>
