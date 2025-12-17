import type { Core } from '@strapi/strapi'
import { glob } from "glob"
import { join } from "path"
import { CONFIG } from "../../utilities/const"
import { Config } from "../../utilities/types"

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    /** search for component lifecycles inside the project files */
    async search() {
        // Search inside strapi components folder for lifecycles files (JS or TS)
        const files = await glob("*/lifecycles/*.{js,ts}", { cwd: strapi.dirs.dist.components })

        // map lifecycles
        const map: Config["Lifecycles"] = {}
        for( const file of files ) {
            // [0] is the componente "category", [1] = "lifecycles", [2] is the lifecycle file for the component (the name of the file is the name of the component)
            const path = file.split("\\")
            const uid = `${path[0]}.${path[2].split(".")[0]}`
            map[uid] = {
                uid: uid,
                path: file
            }
        }

        // Store inside Strapi config the map'd lifecycles
        strapi.config.set(CONFIG.LIFECYCLES, map)
    },

    /** subscribe lifecycles into the correct component */
    async subscribe() {
        Object.values(strapi.config.get(CONFIG.LIFECYCLES, {}) as Config["Lifecycles"]).forEach(v => {
            // verify if the component really exists and log if doesnt
            // if doesnt exist cant subscribe
            if( !strapi.components[v.uid] ) {
                strapi.log.warn(`The component "${v.uid}" does not exist to subscribe lifecycles to.`)
                return
            }

            // require lifecycles file
            let mod = require(join(strapi.dirs.dist.components, v.path))
            mod = mod && mod.__esModule ? mod.default : mod

            // subscribe lifecycles into the component
            strapi.db.lifecycles.subscribe({ models: [v.uid], ...mod })
        })
    },
})
