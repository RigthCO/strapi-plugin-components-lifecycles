import type { Core } from '@strapi/strapi'
import { glob } from "glob"
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
            // Add the category to the object
            map[path[0]] ??= []
            // Push the lifecycle component into the array
            map[path[0]].push(path[2])
        }

        // Store inside Strapi config the map'd lifecycles
        strapi.config.set(CONFIG.LIFECYCLES, map)
    },
})



// 3- com esses lifecycles procurar se os componentes realmente existem
// 4- linkar um com o outro