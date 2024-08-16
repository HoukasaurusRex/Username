import dotenv from 'dotenv-defaults'
import { promises as fs } from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import { fetchToMarkdown } from 'fetch-to-markdown'

dotenv.config()
const contentAPI = process.env.CMS_API
if (!contentAPI) throw new Error('CMS_API is not defined')
const contentDir = path.join(`${__dirname}/../content`)

const components = {
  Comments: '<Comments />',
  Newsletter: '<Newsletter />',
  Cards: '<Cards />',
  Landing: '<Landing />',
}

const articleComponents = [components.Newsletter, components.Comments]
const landingComponents = [components.Landing]

const fetchAbout = async (url = '') => {
  const res = await fetch(url)
  const md = await res.text()
  await fs.rmdir(`${contentDir}/about`, { recursive: true })
  await fs.mkdir(`${contentDir}/about`)
  await fs.writeFile(`${contentDir}/about/README.md`, md)
}

const fetchAllContent = () =>
  Promise.all([
    fetchToMarkdown(contentAPI, 'articles', {
      components: articleComponents,
      contentDir: `${contentDir}/articles`,
    }),
    fetchToMarkdown(contentAPI, 'projects', {
      readme: `---\nsidebar: false\n---\n${components.Cards}`,
      contentDir: `${contentDir}/projects`,
    }),
    fetchToMarkdown(contentAPI, 'landing', {
      components: landingComponents,
      contentDir: `${contentDir}/`,
    }),
    fetchAbout(
      'https://raw.githubusercontent.com/HoukasaurusRex/HoukasaurusRex/master/README.md'
    ),
  ])

fetchAllContent().catch((error) => {
  console.error(error.stack)
  process.exit(1)
})
