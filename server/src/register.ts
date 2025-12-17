import type { Core } from '@strapi/strapi'
import { PLUGIN } from "../utilities/const"

export default async ({ strapi }: { strapi: Core.Strapi }) => {
    await strapi.service(`${PLUGIN}.lifecycles`).search()
    await strapi.service(`${PLUGIN}.lifecycles`).subscribe()
}
