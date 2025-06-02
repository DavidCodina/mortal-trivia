'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { SelectNative as Select } from '@/components'
import { Paginator } from '@/components/Paginator'
import { debounce } from './lodash.debounce'

/* ======================
          data
====================== */

// const data: any = []
// for (let i = 1; i <= 100; i++) { data.push({ id: i.toString(), title: `Item ${i}` })}

// const data = Array.from(Array(50).keys()).map((i) => ({
//   id: i.toString(),
//   title: `Item ${i}`
// }))

const data = [...Array(93)].map((_, index) => {
  const n = index + 1
  return {
    id: n.toString(),
    title: `Item ${n}`
  }
})

/* ========================================================================
                                PaginatorDemo
======================================================================== */

export const PaginatorDemo = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  /* ======================
        state & refs
  ====================== */

  const [currentPage, setCurrentPage] = React.useState(
    parseInt(searchParams.get('page') || '1')
  )

  const [itemsPerPage, setItemsPerPage] = React.useState(
    parseInt(searchParams.get('itemsPerPage') || '10')
  )

  const [numberedItems, setNumberedItems] = React.useState<1 | 3 | 5 | 7>(1)

  const totalSize = Array.isArray(data) ? data.length : 0

  /* ======================
        useEffect()
  ====================== */
  // Update the number of numbered PaginationItems responsively by
  // setting numberedItems based on viewport width.

  React.useLayoutEffect(() => {
    // 'this' or 'e' could be used to get innerWidth when the function is called
    // from within the listener, but we also want to call it outside of the listener...
    function updateNumberedItems(/*this: any, e: any */) {
      if (window.innerWidth < 576) {
        setNumberedItems(1)
      } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
        setNumberedItems(3)
      } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
        setNumberedItems(5)
      } else if (window.innerWidth >= 992) {
        setNumberedItems(7)
      }
    }

    const debouncedUpdateNumberedItems: any = debounce(updateNumberedItems, 250)
    updateNumberedItems() // Call once on mount
    window.addEventListener('resize', debouncedUpdateNumberedItems)

    return () => {
      window.removeEventListener('resize', debouncedUpdateNumberedItems)
    }
  }, [])

  /* ======================
        useEffect()
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // WDS:          https://www.youtube.com/watch?v=VenLRGHx3D4
  //               https://www.youtube.com/watch?v=oZZEI23Ri6E
  // ByteGrad:     https://www.youtube.com/watch?v=ukpgxEemXsk&t=2s
  // CoderOne:     https://www.youtube.com/watch?v=h9hYnDe8DtI&t=145s
  //
  // Cosden Solutons: https://www.youtube.com/watch?v=gMoni2Hm92U // ❗️Not watched yet.
  //
  // Sam Selikoff: https://www.youtube.com/watch?v=sFTGEs2WXQ4
  //
  //               Discusses the 'browser back button bug', and how to avoid 'two sources of truth'.
  //               https://www.youtube.com/watch?v=fYqMPvPvVAc
  //
  // Theo:         https://www.youtube.com/watch?v=t3FUkq7yoCw
  //
  // Academind:    https://www.youtube.com/watch?v=hnmTiXEY4X8
  //
  // Jolly Coding: https://www.youtube.com/watch?v=mXziH-hQARs
  //
  // John Reilly:  https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/
  //               https://johnnyreilly.com/react-usesearchparamsstate
  //
  // Aurora Scharff: https://www.youtube.com/watch?v=dA-8FY5xlbk
  //                 At around 13:15 she goes into an example of adding params in Next.js
  //                 However, that implementation is more for the server side.
  //
  ///////////////////////////////////////////////////////////////////////////

  React.useEffect(() => {
    // Don't omit preexisting params!
    // ❌ const params = new URLSearchParams()
    const params = new URLSearchParams(window.location.search)
    params.set('page', currentPage.toString())
    params.set('itemsPerPage', itemsPerPage.toString())

    ///////////////////////////////////////////////////////////////////////////
    //
    // In Next.js, updating search params with router.push() or
    // router.replace() won't cause a full page refresh, or a component remount.
    // Alternative: router.push(`?${params.toString()}`)
    //
    // Note: Calling router.push() or router.replace() with just the search params
    // (i.e., no prepended pathname) is generally acceptable. Next.js interprets it
    // as a change to the query parameters while preserving the current pathname.
    // However, double-check the bevhavior when using a dynamic route path.
    //
    ///////////////////////////////////////////////////////////////////////////
    router.replace(`?${params.toString()}`)
  }, [currentPage, itemsPerPage, router])

  // Test that router.push()/router.replace() is NOT triggering a remount.
  // useEffect(() => { console.log('Component Mounted!') }, [])

  /* ======================
        useEffect()
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // If the desired behavior is to update the pagination and paginated list
  // When the browser's back button is clicked, then in Next.js, we need to watch
  // searchParams. This only works in conjunction with using router.push(`?${params.toString()}`)
  // in the previous useEffect().
  //
  ///////////////////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   const page  = searchParams.get('page')
  //   const items = searchParams.get('itemsPerPage')
  //   if (page){  setCurrentPage(parseInt(page))   }
  //   if (items){ setItemsPerPage(parseInt(items)) }
  // }, [searchParams])

  /* ======================
  renderSelectItemsPerPage()
  ====================== */

  const renderSelectItemsPerPage = () => {
    return (
      <div
        className='input-group'
        style={{
          margin: '0 auto 15px auto',
          maxWidth: 300
        }}
      >
        <Select
          fieldSize='sm'
          className='rounded-l-none rounded-r-md border-l-0 text-center'
          groupClassName=''
          onChange={(e) => {
            const value: any = parseFloat(e.target.value)
            setItemsPerPage(parseFloat(value))
            setCurrentPage(1)
          }}
          renderSelectBase={(selectBase) => {
            return (
              <div className='flex'>
                <span className='bg-primary flex shrink-0 items-center rounded-l-md p-1 text-xs font-bold text-white'>
                  Items Per Page
                </span>

                {selectBase}
              </div>
            )
          }}
          value={itemsPerPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </div>
    )
  }

  /* ======================
    renderPaginatedData()
  ====================== */

  const renderPaginatedData = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return null
    }

    const filterItemsByIndexRange = (_item: any, index: number) => {
      const firstIndex = currentPage * itemsPerPage - itemsPerPage
      const lastIndex = firstIndex + (itemsPerPage - 1)
      return index >= firstIndex && index <= lastIndex
    }

    return (
      <div className='relative mx-auto mb-6 max-w-[300px]'>
        <ul className='list-group list-group-sm shadow-sm'>
          {data.filter(filterItemsByIndexRange).map((item) => {
            return (
              <li
                className={`list-group-item text-primary hover:bg-primary font-semibold hover:text-white`}
                key={item.id}
              >
                {item.title}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  /* ======================
      renderPagination()
  ====================== */

  const renderPagination = () => {
    if (typeof totalSize === 'number' && totalSize > 0) {
      return (
        <>
          <nav
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 5
            }}
          >
            <div
            // The borderRadius is defined by the buttons that are inside
            // of the pagination items <li>s. For that reason, it's a little
            // tricky to modify the borderRadius. This is a workaround for that.
            // It works in conjunciton with paginationStyle={{margin: -1 }}
            // But then the top and bottom of the focus shadow are cut off.
            // This is one of those situations where styled components would be
            // very useful.
            // style={{ borderRadius: 10, border: '1px solid #409', overflow: 'hidden' }}
            >
              <Paginator
                onClick={(newPage, prevPage, e) => {
                  console.log({ newPage, prevPage, e })
                  if (typeof newPage === 'number') {
                    setCurrentPage(newPage)
                  }
                }}
                paginationClassName=''
                paginationStyle={{}}
                activePaginationItemClassName=''
                activePaginationItemStyle={{}}
                // Note: when active variants are not defined, they default to
                // the non-active counterparts. The active variants overwrite and
                // entirely REPLACE the non-active variants, rather than merging with them.
                activePaginationButtonClassName=''
                activePaginationButtonStyle={
                  {
                    // Console warning: Removing a style property during rerender (border) when a conflicting
                    // property is set (borderColor) can lead to styling bugs. To avoid this, don't mix
                    // shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.
                    // backgroundColor: '#00b5e2',
                    // border: '1px solid #409',
                    // color: '#fff'
                  }
                }
                paginationItemClassName=''
                paginationItemStyle={{}}
                paginationButtonClassName=''
                paginationButtonStyle={{}}
                page={currentPage}
                itemsPerPage={
                  typeof itemsPerPage === 'number' ? itemsPerPage : 10
                }
                itemCount={Array.isArray(data) ? data.length : 0}
                numberedItems={numberedItems}
                showFirstLast={true}
                showPrevNext={true}
                paginationSize='small'
              />
            </div>
          </nav>

          <div className='text-center text-xs'>
            Showing Page{' '}
            <span className='text-primary font-bold'>{currentPage}</span> of{' '}
            <span className='text-primary font-bold'>
              {Math.ceil(totalSize / itemsPerPage)}
            </span>
          </div>
        </>
      )
    }

    return (
      <>
        <h3 className='mb-1 text-center font-bold'>
          {/* https://unicode.org/emoji/charts/full-emoji-list.html */}
          🎱 Reply hazy, try again...
        </h3>
        <div className='text-center text-xs font-semibold'>(No Results)</div>
      </>
    )
  }

  /* ======================
          return 
  ====================== */

  return (
    <>
      {renderSelectItemsPerPage()}
      {renderPaginatedData()}
      {renderPagination()}
    </>
  )
}
