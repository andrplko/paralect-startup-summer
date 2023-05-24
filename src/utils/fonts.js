import { Poppins, Inter, Roboto, Open_Sans } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
})

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
})