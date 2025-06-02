'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from '@/components/Table'

/* ========================================================================

======================================================================== */

export const TableDemo = () => {
  return (
    <>
      <Table
        className=''
        bordered
        hover
        striped
        // stripedColumns
        tableContainerClassName=' max-w-[800px] mx-auto mt-12 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
      >
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
          //className='table-group-divider'
          >
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$150.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV002</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV003</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$350.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV004</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$450.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV005</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$550.00</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableFooter>
      </Table>

      <Table
        className=''
        bordered
        hover
        striped
        // stripedColumns
        tableContainerClassName=' max-w-[800px] mx-auto mt-12 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
        variant='secondary'
      >
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
          //className='table-group-divider'
          >
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$150.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV002</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV003</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$350.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV004</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$450.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV005</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$550.00</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableFooter>
      </Table>

      <Table
        className=''
        bordered
        hover
        // renderTableOnly // i.e., without container
        striped
        // stripedColumns
        tableContainerClassName=' max-w-[800px] mx-auto mt-12 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
        variant='primary'
      >
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
          //className='table-group-divider'
          >
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$150.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV002</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV003</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$350.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV004</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$450.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>INV005</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$550.00</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
