import * as React from 'react'
import { StylesConfig } from 'react-select'

type GetStylesOptions = {
  disabled: boolean
  error: string
  style: React.CSSProperties
  touched: boolean
}

type GetStyles = (options: GetStylesOptions) => StylesConfig

/* ======================
      getStyles()
====================== */

export const getStyles: GetStyles = ({ disabled, error, style, touched }) => {
  const stylesConfig: StylesConfig = {
    container: (baseStyles) => {
      return {
        ...baseStyles
      }
    },

    valueContainer: (baseStyles) => {
      return {
        ...baseStyles,
        padding: 0
      }
    },

    // ⚠️ In order for Tailwind classses to work in classNames.control, you
    // have to opt out of most of styles.control.
    control: (_baseStyles, _state) => {
      return {
        label: 'control',
        cursor: 'default',
        boxSizing: 'border-box',
        ...style
      }
    },

    input: (baseStyles) => {
      // console.log('input:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        color: 'var(--color-foreground)',
        margin: 0,
        padding: 0
      }
    },

    singleValue: (baseStyles) => {
      // console.log('singleValue:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        marginLeft: 0,
        marginRight: 0,
        color: 'var(--color-foreground)'
      }
    },

    // The multValue tag was pushing out the size of the ReactSelect
    // This is fixed by setting maring to 0px here and by setting vertical
    // padding to 0px on the multiValueLabel.
    multiValue: (baseStyles) => {
      // console.log('multiValue:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        boxShadow:
          'inset 0px 0px 0px 0.5px oklch(from var(--color-foreground) l c h / 0.3), 0px 1px 2px rgb(0,0,0,0.25)',
        color: 'var(--color-foreground)',
        backgroundColor: 'var(--color-accent)',
        borderRadius: '0.375em',
        overflow: 'hidden',

        margin: '0px',
        ':not(:nth-last-of-type(1))': {
          marginRight: '6px'
        }
      }
    },

    multiValueLabel: (baseStyles) => {
      // console.log('multiValueLabel:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        paddingTop: '0px',
        paddingBottom: '0px',
        color: 'var(--color-foreground)'
      }
    },

    multiValueRemove: (baseStyles) => {
      // console.log('multiValueRemove:', JSON.stringify(baseStyles, null, 2))

      return {
        ...baseStyles,
        cursor: 'pointer',
        // The background color and foreground color were already set in the
        // theme prop, but using ':hover' here seems to completely ovverride it,
        // why is why I'm re-setting them.
        ':hover': {
          backgroundColor: 'var(--color-red-200)',
          boxShadow:
            'inset 0px 0px 0px 0.5px oklch(from var(--color-destructive) l c h / 0.99)',
          borderTopRightRadius: '0.375em',
          borderBottomRightRadius: '0.375em',
          color: 'var(--color-destructive)'
        }
      }
    },

    indicatorsContainer: (baseStyles) => {
      // console.log('indicatorsContainer:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles
      }
    },

    clearIndicator: (baseStyles) => {
      // console.log('clearIndicator:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        padding: 0,
        paddingRight: '0.5em',
        color: disabled
          ? 'var(--border)' // ???
          : error
            ? 'var(--color-destructive)'
            : touched
              ? 'var(--color-success)'
              : 'var(--border)',
        cursor: 'pointer',
        // The default size is '20px', this results in fieldSize="xs"
        // having a height of 28px, rather than 26px.
        svg: {
          height: '1.5em',
          width: '1.5em'
        },
        ':hover': {
          color: disabled
            ? 'var(--border)' // ???
            : error
              ? 'var(--color-destructive)'
              : touched
                ? 'var(--color-success)'
                : 'var(--color-muted-foreground)'
        }
      }
    },

    indicatorSeparator: (baseStyles) => {
      // console.log('indicatorSeparator:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,

        backgroundColor: disabled
          ? 'var(--border)' // ???
          : error
            ? 'var(--color-destructive)'
            : touched
              ? 'var(--color-success)'
              : 'var(--border)',
        margin: 0
      }
    },

    dropdownIndicator: (baseStyles) => {
      // console.log('dropdownIndicator:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,

        padding: 0,
        paddingLeft: '0.5em',
        color: disabled
          ? 'var(--border)' // ???
          : error
            ? 'var(--color-destructive)'
            : touched
              ? 'var(--color-success)'
              : 'var(--border)',
        cursor: 'pointer',
        // The default size is '20px', this results in fieldSize="xs"
        // having a height of 28px, rather than 26px.
        svg: {
          height: '1.5em',
          width: '1.5em'
        },
        ':hover': {
          color: disabled
            ? 'var(--border)' // ???
            : error
              ? 'var(--color-destructive)'
              : touched
                ? 'var(--color-success)'
                : 'var(--color-muted-foreground)'
        }
      }
    },
    menu: (baseStyles) => {
      // console.log('menu:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        backgroundColor: 'var(--background-light)',
        borderRadius: '0.375em',
        boxShadow:
          '0 0 0 1px var(--color-border), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
        marginBottom: '0px',
        marginTop: '0px',
        fontSize: 14,
        overflow: 'hidden',
        top: 'calc(100% + 10px)'
      }
    },
    menuList: (baseStyles) => {
      // console.log('menuList:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        paddingTop: 0,
        paddingBottom: 0
      }
    },

    option: (baseStyles, _props) => {
      // console.log('option:', JSON.stringify(baseStyles, null, 2))

      return {
        ...baseStyles,
        padding: '4px 8px'

        ///////////////////////////////////////////////////////////////////////////
        //
        // Rather than doing this:
        //
        //   ':hover': { backgroundColor: 'var(--color-primary)' }
        //
        // It seems to work better if you set the theme directly.
        //
        //   theme={(theme) => ({
        //     ...theme,
        //     colors: {
        //       ...theme.colors,
        //       primary25: 'var(--color-primary)'
        //     }
        //   })}
        //
        // Otherwise, it seems like you're fighting against the theme.
        //
        ///////////////////////////////////////////////////////////////////////////
      }
    },

    placeholder: (baseStyles) => {
      // console.log('placeholder:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        color: 'var(--color-muted-foreground)'
      }
    },

    noOptionsMessage: (baseStyles) => {
      console.log('noOptionsMessage:', JSON.stringify(baseStyles, null, 2))
      return {
        ...baseStyles,
        color: 'var(--color-foreground)'
      }
    },

    // ???
    group: (baseStyles) => {
      return {
        ...baseStyles
      }
    },

    // ???
    groupHeading: (baseStyles) => {
      return {
        ...baseStyles
      }
    },

    // ???
    loadingMessage: (baseStyles) => {
      return {
        ...baseStyles
      }
    },
    // ???
    loadingIndicator: (baseStyles) => {
      return {
        ...baseStyles
      }
    }
  }

  return stylesConfig
}

/* 
export declare function mergeStyles<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(source: StylesConfig<Option, IsMulti, Group>, target?: StylesConfig<Option, IsMulti, Group>): {
    clearIndicator?: ((base: CSSObjectWithLabel, props: ClearIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    container?: ((base: CSSObjectWithLabel, props: ContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    control?: ((base: CSSObjectWithLabel, props: ControlProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    dropdownIndicator?: ((base: CSSObjectWithLabel, props: DropdownIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    group?: ((base: CSSObjectWithLabel, props: GroupProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    groupHeading?: ((base: CSSObjectWithLabel, props: GroupHeadingProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    indicatorsContainer?: ((base: CSSObjectWithLabel, props: IndicatorsContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    indicatorSeparator?: ((base: CSSObjectWithLabel, props: IndicatorSeparatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    input?: ((base: CSSObjectWithLabel, props: InputProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    loadingIndicator?: ((base: CSSObjectWithLabel, props: LoadingIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    loadingMessage?: ((base: CSSObjectWithLabel, props: NoticeProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menu?: ((base: CSSObjectWithLabel, props: MenuProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menuList?: ((base: CSSObjectWithLabel, props: MenuListProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menuPortal?: ((base: CSSObjectWithLabel, props: PortalStyleArgs) => CSSObjectWithLabel) | undefined;
    multiValue?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    multiValueLabel?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    multiValueRemove?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    noOptionsMessage?: ((base: CSSObjectWithLabel, props: NoticeProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    option?: ((base: CSSObjectWithLabel, props: OptionProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    placeholder?: ((base: CSSObjectWithLabel, props: PlaceholderProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    singleValue?: ((base: CSSObjectWithLabel, props: SingleValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    valueContainer?: ((base: CSSObjectWithLabel, props: ValueContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
};
*/
