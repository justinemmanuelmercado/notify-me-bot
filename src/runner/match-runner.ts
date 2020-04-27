// export function matchRunner({ title, id }: { body: string, title: string, id: string }) {
//   setInterval(async () => {
//     const ran = (Math.random() * 1000).toFixed(0)
//     const message = `Watcher #${id} is running and sending you ${ran}`
//     const result = await wtcher.notify({ id, body: message, title, channel: wtcher.channel })
//     console.log(message)
//     if (!result) {
//       throw new Error('failed to notify')
//     }
//   }, 5000)
// }
