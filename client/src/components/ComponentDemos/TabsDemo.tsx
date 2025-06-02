'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs'

/* ========================================================================

======================================================================== */

export const TabsDemo = () => {
  return (
    <Tabs defaultValue='section1' className='mx-auto mb-6 max-w-[800px]'>
      {/* TabsList has `inline-flex` by default. However, grid implementations are also common. */}
      <TabsList className='grid w-full grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3'>
        <TabsTrigger value='section1'>Section 1</TabsTrigger>
        <TabsTrigger value='section2'>Section 2</TabsTrigger>
        <TabsTrigger value='section3'>Section 3</TabsTrigger>
      </TabsList>

      {/* ================= */}

      <TabsContent value='section1'>
        <div className='bg-background-light rounded-lg border p-4 shadow'>
          <h3 className='text-primary text-xl font-black'>Section 1</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit magni
            itaque possimus expedita ex in harum facere libero dolor
            consequuntur enim nisi similique illum hic quia quo, sunt placeat
            praesentium! Error illo rerum eveniet vel voluptatem numquam eos, in
            quisquam perferendis animi libero, ratione accusantium laboriosam
            fuga molestiae voluptas cum repellendus, blanditiis provident
            ducimus eum ipsam. Ullam eligendi explicabo illum nisi vero sapiente
            sunt unde quos rerum maiores? Perspiciatis aspernatur facilis odit
            minus consequatur possimus doloribus voluptates quia, vitae
            voluptatibus? Optio eveniet ratione pariatur, repudiandae quas
            magnam, officia delectus ullam distinctio, eum cum vitae architecto
            excepturi corporis adipisci impedit doloribus.
          </p>
        </div>
      </TabsContent>

      {/* ================= */}

      <TabsContent value='section2'>
        <div className='bg-background-light rounded-lg border p-4 shadow'>
          <h3 className='text-primary text-xl font-black'>Section 2</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit magni
            itaque possimus expedita ex in harum facere libero dolor
            consequuntur enim nisi similique illum hic quia quo, sunt placeat
            praesentium! Error illo rerum eveniet vel voluptatem numquam eos, in
            quisquam perferendis animi libero, ratione accusantium laboriosam
            fuga molestiae voluptas cum repellendus...
          </p>
        </div>
      </TabsContent>

      {/* ================= */}

      <TabsContent value='section3'>
        <div className='bg-background-light rounded-lg border p-4 shadow'>
          <h3 className='text-primary text-xl font-black'>Section 3</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit magni
            itaque possimus expedita ex in harum facere libero dolor
            consequuntur enim nisi similique illum hic quia quo, sunt placeat
            praesentium! Error illo rerum eveniet vel voluptatem numquam eos, in
            quisquam perferendis animi libero, ratione accusantium laboriosam
            fuga molestiae voluptas cum repellendus, blanditiis provident
            ducimus eum ipsam. Ullam eligendi explicabo illum nisi vero sapiente
            sunt unde quos rerum maiores? Perspiciatis aspernatur facilis odit
            minus consequatur possimus doloribus voluptates quia, vitae
            voluptatibus? Optio eveniet ratione pariatur, repudiandae quas
            magnam, officia delectus ullam distinctio, eum cum vitae architecto
            excepturi corporis adipisci impedit doloribus.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
