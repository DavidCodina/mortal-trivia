'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/card'

const images = [
  'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=300&h=179&dpr=2',
  'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=300&h=179&dpr=2',
  'https://images.pexels.com/photos/736530/pexels-photo-736530.jpeg?auto=compress&cs=tinysrgb&w=300&h=179&dpr=2',
  'https://images.pexels.com/photos/248350/pexels-photo-248350.jpeg?auto=compress&cs=tinysrgb&w=300&h=179&dpr=2',
  'https://images.pexels.com/photos/1120049/pexels-photo-1120049.jpeg?auto=compress&cs=tinysrgb&w=300&h=179&dpr=2',
  'https://images.pexels.com/photos/1444321/pexels-photo-1444321.jpeg?auto=compress&cs=tinysrgb&w=300&h=179&dpr=2',
  'https://images.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg?auto=compress&cs=tinysrgb&w=300&h=179&dpr=2',
  'https://images.pexels.com/photos/384555/pexels-photo-384555.jpeg?auto=compress&cs=tinysrgb&w=300&h=179&dpr=2'
]

/* ========================================================================

======================================================================== */
//

export const CardDemo = () => {
  /* ======================
          return
  ====================== */

  return (
    <section
      className={`mx-auto grid grid-cols-[repeat(auto-fill,minmax(300px,400px))] justify-center gap-6`}
    >
      {images.map((image, index) => (
        <Card className='' key={index}>
          <img className='block h-[200px] object-cover' src={image} alt='' />
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description...</CardDescription>
          </CardHeader>
          <CardContent className=''>
            <p className=''>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              repudiandae fuga perferendis voluptatum commodi, qui sed molestiae
              iure ad fugiat nulla! Alias voluptates quia quod quisquam natus
              laboriosam expedita ducimus consequuntur. Aliquid, maiores
              mollitia exercitationem facere laborum iste corrupti quas sed
              eveniet deleniti suscipit, fugiat quod ut molestiae temporibus
              harum?
            </p>
          </CardContent>
          <CardFooter className=''>
            <button className='min-w-[100px] rounded-lg border border-red-700 bg-red-500 px-2 py-1 text-sm font-black text-white'>
              Cancel
            </button>
            <button className='min-w-[100px] rounded-lg border border-blue-700 bg-blue-500 px-2 py-1 text-sm font-black text-white'>
              Confirm
            </button>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
