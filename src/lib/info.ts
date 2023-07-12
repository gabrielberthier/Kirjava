// This is for convenience as you start out with this template.
// If you'd rather hardcode these values into your pages,
// feel free to remove this file.

// URL of your website
export const website = 'https://sveltekit-blog-template.vercel.app'

export const firstName = 'Gabriel'
export const lastName = 'Berthier'
export const name = `${firstName} ${lastName}`
export const whereIam = 'São Luís, BR'

// Used for the landing page & footer of posts
export const avatar = '/imgs/1689091413006.jpg'
export const bio = `\
I'm ${firstName}, a software engineer based in Brazil.
`

// Your social usernames, empty strings won't be used.
// For sake of the live demo, I'm using `username/repo` for github,
// but you can replace with just your username.
export const github = 'gabrielberthier'
export const twitter = 'GabriBerthier'
export const linkedin = 'gabriel-nogueira-berthier-1b280214a'
export const instagram = 'gabrielberthier'

type PlacesIveWorked = {
  name: string
  position: string
  image: string
  from: string
  to?: string
}

export const placesIveWorkd: PlacesIveWorked[] = [
  {
    name: 'DM',
    position: 'Dev Backend PL (Python)',
    image: 'dm',
    from: '10/2022'
  },
  {
    name: 'IBM',
    position: 'Dev Backend JR (Python)',
    image: 'ibm',
    from: '01/2022',
    to: '09/2022'
  },
  {
    name: 'Zappts',
    position: 'Dev Backend JR (Python)',
    image: 'zappts',
    from: '06/2021',
    to: '01/2021'
  },
  {
    name: 'DPE',
    position: 'Full-stack JS/TS Intern Dev',
    image: 'dpe',
    from: '03/2020',
    to: '03/2021'
  }
]
