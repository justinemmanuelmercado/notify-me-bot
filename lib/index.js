"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const discord_controller_1 = require("./discord-controller");
const reddit_watcher_controller_1 = require("./reddit-watcher-controller");
const reddit_watchers_1 = require("./mock/reddit-watchers");
dotenv_1.default.config();
async function main() {
    const discordController = await discord_controller_1.DiscordControllerClass.build();
    if (!discordController)
        throw new Error('unable to connect to discord');
    const notifier = async (notification) => {
        try {
            await discordController.send(notification);
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };
    const redditController = new reddit_watcher_controller_1.RedditWatcherControllerClass(notifier);
    if (!redditController)
        throw new Error('unable to connect to reddit');
    for (const watcher of reddit_watchers_1.redditWatchers) {
        redditController.createWatcher(watcher);
    }
    console.log('Running app');
    redditController.runWatchers();
}
(() => {
    try {
        main();
    }
    catch (e) {
        console.log(e);
    }
})();
