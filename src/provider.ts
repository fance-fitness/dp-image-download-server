import download = require("image-downloader")

export class Provider {
    public static async downloadImage(url: string, name: string): Promise<any> {
        const internalIdentifier: string = `img/${`${new Date().toISOString()}-${name}`}.jpeg`
        const identifier: string = `${__dirname}/../${internalIdentifier}`
        console.log(identifier)
        console.log(url)
        const options: any = {
            url,
            dest: identifier,
        }

        try {
            console.log(`downloading ${JSON.stringify(options)}`)
            const { filename } = await download.image(options)
            console.log(filename)
        } catch (e) {
            console.error(e)
        }

        return { internalURL: internalIdentifier }
    }
    public static getImagePath(html: string){
        // const date = html.split('startDate":"')[1].split('"')[0]
        return 'https://fance-stiftung.de/api/events/img/2019-10-20T22:54:25.593Z-MAS Tango - Mannheimer StudentenSchüler Tango Programm.jpeg'
    }
}