'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs'
import { AccordionDemo } from './AccordionDemo'
import { AlertDemo } from './AlertDemo'

import { AnchorDemo } from './AnchorDemo'
import { BadgeDemo } from './BadgeDemo'
import { BreadcrumbDemo } from './BreadcrumbDemo'
import { ButtonDemo } from './ButtonDemo'
import { ButtonGroupDemo } from './ButtonGroupDemo'
import { CardDemo } from './CardDemo'
import { CarouselDemo } from './CarouselDemo'
import { CollapsibleDemo } from './CollapsibleDemo'
import { CustomSelectDemo } from './CustomSelectDemo'
import { DatePickerDemo } from './DatePickerDemo'
import { DropdownMenuDemo } from './DropdownMenuDemo'
import { InputPasswordDemo } from './InputPasswordDemo'
import { UncontrolledFormDemo } from './UncontrolledFormDemo'
import { ControlledFormDemo } from './ControlledFormDemo'

import { ControlledModalDemo } from './ControlledModalDemo'
import { PaginatorDemo } from './PaginatorDemo'
import { PopoverDemo } from './PopoverDemo'
import { ReadMoreDemo } from './ReadMoreDemo'
import { ScrollAreaDemo } from './ScrollAreaDemo'
import { SelectNativeDemo } from './SelectNativeDemo'
import { SeparatorDemo } from './SeparatorDemo'
import { SheetDemo } from './SheetDemo'
import { SkeletonDemo } from './SkeletonDemo'
import { SonnerDemo } from './SonnerDemo'

import { SpinnerDemo } from './SpinnerDemo'
import { StepperDemo } from './StepperDemo'
import { TableDemo } from './TableDemo'
import { TabsDemo } from './TabsDemo'
import { ToggleDemo } from './ToggleDemo'
import { ToggleGroupDemo } from './ToggleGroupDemo'
import { TooltipDemo } from './TooltipDemo'
import { CalendarDemo } from './CalendarDemo'

/* ========================================================================

======================================================================== */

export const ComponentDemos = () => {
  return (
    <Tabs defaultValue='paginator' className='mx-auto mb-6 gap-6'>
      <TabsList className='grid w-full grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        <TabsTrigger value='accordion'>Accordion</TabsTrigger>
        <TabsTrigger value='alert'>Alert</TabsTrigger>
        <TabsTrigger value='anchor'>Anchor</TabsTrigger>
        <TabsTrigger value='badge'>Badge</TabsTrigger>
        <TabsTrigger value='breadcrumb'>Breadcrumb</TabsTrigger>
        <TabsTrigger value='button'>Button</TabsTrigger>
        <TabsTrigger value='button-group'>Button Group</TabsTrigger>
        <TabsTrigger value='calendar'>Calendar</TabsTrigger>
        <TabsTrigger value='card'>Card</TabsTrigger>
        <TabsTrigger value='carousel'>Carousel</TabsTrigger>
        <TabsTrigger value='collapsible'>Collapsible</TabsTrigger>
        <TabsTrigger value='custom-select'>Custom Select</TabsTrigger>
        <TabsTrigger value='date-picker'>Date Picker</TabsTrigger>

        <TabsTrigger value='dropdown-menu'>Dropdown Menu</TabsTrigger>
        <TabsTrigger value='input-password'>Input Password</TabsTrigger>
        <TabsTrigger value='uncontrolled-form'>Uncontrolled Form</TabsTrigger>
        <TabsTrigger value='controlled-form'>Controlled Form</TabsTrigger>
        <TabsTrigger value='modal'>Modal</TabsTrigger>

        <TabsTrigger value='paginator'>Paginator</TabsTrigger>

        <TabsTrigger value='popover'>Popover</TabsTrigger>
        <TabsTrigger value='read-more'>Read More</TabsTrigger>
        <TabsTrigger value='scroll-area'>Scroll Area</TabsTrigger>
        <TabsTrigger value='select-native'>Select Native</TabsTrigger>
        <TabsTrigger value='separator'>Separator</TabsTrigger>
        <TabsTrigger value='sheet'>Sheet</TabsTrigger>
        <TabsTrigger value='skeleton'>Skeleton</TabsTrigger>
        <TabsTrigger value='sonner'>Sonner</TabsTrigger>
        <TabsTrigger value='spinner'>Spinner</TabsTrigger>
        <TabsTrigger value='stepper'>Stepper</TabsTrigger>
        <TabsTrigger value='table'>Table</TabsTrigger>
        <TabsTrigger value='tabs'>Tabs</TabsTrigger>
        <TabsTrigger value='toggle'>Toggle</TabsTrigger>
        <TabsTrigger value='toggle-group'>Toggle Group</TabsTrigger>
        <TabsTrigger value='tooltip'>Tooltip</TabsTrigger>
      </TabsList>

      {/* ================= */}

      <TabsContent value='accordion'>
        <AccordionDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='alert'>
        <AlertDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='anchor'>
        <AnchorDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='badge'>
        <BadgeDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='breadcrumb'>
        <BreadcrumbDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='button'>
        <ButtonDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='button-group'>
        <ButtonGroupDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='calendar'>
        <CalendarDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='card'>
        <CardDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='carousel'>
        <CarouselDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='collapsible'>
        <CollapsibleDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='custom-select'>
        <CustomSelectDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='date-picker'>
        <DatePickerDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='dropdown-menu'>
        <DropdownMenuDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='input-password'>
        <InputPasswordDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='uncontrolled-form'>
        <UncontrolledFormDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='controlled-form'>
        <ControlledFormDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='modal'>
        <ControlledModalDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='paginator'>
        <PaginatorDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='popover'>
        <PopoverDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='read-more'>
        <ReadMoreDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='scroll-area'>
        <ScrollAreaDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='select-native'>
        <SelectNativeDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='separator'>
        <SeparatorDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='sheet'>
        <SheetDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='skeleton'>
        <SkeletonDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='sonner'>
        <SonnerDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='spinner'>
        <SpinnerDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='stepper'>
        <StepperDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='table'>
        <TableDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='tabs'>
        <TabsDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='toggle'>
        <ToggleDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='toggle-group'>
        <ToggleGroupDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='tooltip'>
        <TooltipDemo />{' '}
      </TabsContent>
    </Tabs>
  )
}
