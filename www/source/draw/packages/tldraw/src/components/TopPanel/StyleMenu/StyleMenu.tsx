import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { strokes, fills, defaultTextStyle } from '~state/shapes/shared/shape-styles'
import { useTldrawApp } from '~hooks'
import { DMCheckboxItem, DMContent, DMRadioItem } from '~components/Primitives/DropdownMenu'
import {
  CircleIcon,
  DashDashedIcon,
  DashDottedIcon,
  DashDrawIcon,
  DashSolidIcon,
  SizeLargeIcon,
  SizeMediumIcon,
  SizeSmallIcon,
} from '~components/Primitives/icons'
import { ToolButton } from '~components/Primitives/ToolButton'
import {
  TDSnapshot,
  ColorStyle,
  DashStyle,
  SizeStyle,
  ShapeStyles,
  FontStyle,
  AlignStyle,
} from '~types'
import { styled } from '~styles'
import { breakpoints } from '~components/breakpoints'
import { Divider } from '~components/Primitives/Divider'
import { preventEvent } from '~components/preventEvent'
import {
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@radix-ui/react-icons'
import { RowButton } from '~components/Primitives/RowButton'

const currentStyleSelector = (s: TDSnapshot) => s.appState.currentStyle
const selectedIdsSelector = (s: TDSnapshot) =>
  s.document.pageStates[s.appState.currentPageId].selectedIds

const STYLE_KEYS = Object.keys(defaultTextStyle) as (keyof ShapeStyles)[]

const DASH_ICONS = {
  [DashStyle.Draw]: <DashDrawIcon />,
  [DashStyle.Solid]: <DashSolidIcon />,
  [DashStyle.Dashed]: <DashDashedIcon />,
  [DashStyle.Dotted]: <DashDottedIcon />,
}

const SIZE_ICONS = {
  [SizeStyle.Small]: <SizeSmallIcon />,
  [SizeStyle.Medium]: <SizeMediumIcon />,
  [SizeStyle.Large]: <SizeLargeIcon />,
}

const ALIGN_ICONS = {
  [AlignStyle.Start]: <TextAlignLeftIcon />,
  [AlignStyle.Middle]: <TextAlignCenterIcon />,
  [AlignStyle.End]: <TextAlignRightIcon />,
  [AlignStyle.Justify]: <TextAlignJustifyIcon />,
}

const themeSelector = (s: TDSnapshot) => (s.settings.isDarkMode ? 'dark' : 'light')

const showTextStylesSelector = (s: TDSnapshot) => {
  const { activeTool, currentPageId: pageId } = s.appState
  const page = s.document.pages[pageId]

  return (
    activeTool === 'text' ||
    s.document.pageStates[pageId].selectedIds.some((id) => 'text' in page.shapes[id])
  )
}

export const StyleMenu = React.memo(function ColorMenu(): JSX.Element {
  const app = useTldrawApp()

  const theme = app.useStore(themeSelector)
  const showTextStyles = app.useStore(showTextStylesSelector)

  const currentStyle = app.useStore(currentStyleSelector)
  const selectedIds = app.useStore(selectedIdsSelector)

  const [displayedStyle, setDisplayedStyle] = React.useState(currentStyle)
  const rDisplayedStyle = React.useRef(currentStyle)

  React.useEffect(() => {
    const {
      appState: { currentStyle },
      page,
      selectedIds,
    } = app

    let commonStyle = {} as ShapeStyles

    if (selectedIds.length <= 0) {
      commonStyle = currentStyle
    } else {
      const overrides = new Set<string>([])

      app.selectedIds
        .map((id) => page.shapes[id])
        .forEach((shape) => {
          STYLE_KEYS.forEach((key) => {
            if (overrides.has(key)) return
            if (commonStyle[key] === undefined) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              commonStyle[key] = shape.style[key]
            } else {
              if (commonStyle[key] === shape.style[key]) return
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              commonStyle[key] = shape.style[key]
              overrides.add(key)
            }
          })
        })
    }

    // Until we can work out the correct logic for deciding whether or not to
    // update the selected style, do a string comparison. Yuck!
    if (JSON.stringify(commonStyle) !== JSON.stringify(rDisplayedStyle.current)) {
      rDisplayedStyle.current = commonStyle
      setDisplayedStyle(commonStyle)
    }
  }, [currentStyle, selectedIds])

  const handleToggleFilled = React.useCallback((checked: boolean) => {
    app.style({ isFilled: checked })
  }, [])

  const handleDashChange = React.useCallback((value: string) => {
    app.style({ dash: value as DashStyle })
  }, [])

  const handleSizeChange = React.useCallback((value: string) => {
    app.style({ size: value as SizeStyle })
  }, [])

  const handleFontChange = React.useCallback((value: string) => {
    app.style({ font: value as FontStyle })
  }, [])

  const handleTextAlignChange = React.useCallback((value: string) => {
    app.style({ textAlign: value as AlignStyle })
  }, [])

  const handleMenuOpenChange = React.useCallback(
    (open: boolean) => {
      app.setMenuOpen(open)
    },
    [app]
  )

  return (
    <DropdownMenu.Root dir="ltr" onOpenChange={handleMenuOpenChange}>
      <DropdownMenu.Trigger asChild>
        <ToolButton variant="text">
          样式
          <OverlapIcons
            style={{
              color: strokes[theme][displayedStyle.color as ColorStyle],
            }}
          >
            {displayedStyle.isFilled && (
              <CircleIcon
                size={16}
                stroke="none"
                fill={fills[theme][displayedStyle.color as ColorStyle]}
              />
            )}
            {DASH_ICONS[displayedStyle.dash]}
          </OverlapIcons>
        </ToolButton>
      </DropdownMenu.Trigger>
      <DMContent>
        <StyledRow variant="tall">
          <span>颜色</span>
          <ColorGrid>
            {Object.keys(strokes.light).map((style: string) => (
              <DropdownMenu.Item key={style} onSelect={preventEvent} asChild>
                <ToolButton
                  variant="icon"
                  isActive={displayedStyle.color === style}
                  onClick={() => app.style({ color: style as ColorStyle })}
                >
                  <CircleIcon
                    size={18}
                    strokeWidth={2.5}
                    fill={
                      displayedStyle.isFilled ? fills.light[style as ColorStyle] : 'transparent'
                    }
                    stroke={strokes.light[style as ColorStyle]}
                  />
                </ToolButton>
              </DropdownMenu.Item>
            ))}
          </ColorGrid>
        </StyledRow>
        <DMCheckboxItem
          variant="styleMenu"
          checked={!!displayedStyle.isFilled}
          onCheckedChange={handleToggleFilled}
        >
          填充
        </DMCheckboxItem>
        <StyledRow>
          边框
          <StyledGroup dir="ltr" value={displayedStyle.dash} onValueChange={handleDashChange}>
            {Object.values(DashStyle).map((style) => (
              <DMRadioItem
                key={style}
                isActive={style === displayedStyle.dash}
                value={style}
                onSelect={preventEvent}
                bp={breakpoints}
              >
                {DASH_ICONS[style as DashStyle]}
              </DMRadioItem>
            ))}
          </StyledGroup>
        </StyledRow>
        <StyledRow>
          大小
          <StyledGroup dir="ltr" value={displayedStyle.size} onValueChange={handleSizeChange}>
            {Object.values(SizeStyle).map((sizeStyle) => (
              <DMRadioItem
                key={sizeStyle}
                isActive={sizeStyle === displayedStyle.size}
                value={sizeStyle}
                onSelect={preventEvent}
                bp={breakpoints}
              >
                {SIZE_ICONS[sizeStyle as SizeStyle]}
              </DMRadioItem>
            ))}
          </StyledGroup>
        </StyledRow>
        {showTextStyles && (
          <>
            <Divider />
            <StyledRow>
              字体
              <StyledGroup dir="ltr" value={displayedStyle.font} onValueChange={handleFontChange}>
                {Object.values(FontStyle).map((fontStyle) => (
                  <DMRadioItem
                    key={fontStyle}
                    isActive={fontStyle === displayedStyle.font}
                    value={fontStyle}
                    onSelect={preventEvent}
                    bp={breakpoints}
                  >
                    <FontIcon fontStyle={fontStyle}>Aa</FontIcon>
                  </DMRadioItem>
                ))}
              </StyledGroup>
            </StyledRow>
            <StyledRow>
              位置
              <StyledGroup
                dir="ltr"
                value={displayedStyle.textAlign}
                onValueChange={handleTextAlignChange}
              >
                {Object.values(AlignStyle).map((style) => (
                  <DMRadioItem
                    key={style}
                    isActive={style === displayedStyle.textAlign}
                    value={style}
                    onSelect={preventEvent}
                    bp={breakpoints}
                  >
                    {ALIGN_ICONS[style]}
                  </DMRadioItem>
                ))}
              </StyledGroup>
            </StyledRow>
          </>
        )}
      </DMContent>
    </DropdownMenu.Root>
  )
})

const ColorGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gap: 0,
})

// const StyledRowInner = styled('div', {
//   height: '100%',
//   width: '100%',
//   backgroundColor: '$panel',
//   borderRadius: '$2',
//   display: 'flex',
//   gap: '$1',
//   flexDirection: 'row',
//   alignItems: 'center',
//   padding: '0 $3',
//   justifyContent: 'space-between',
//   border: '1px solid transparent',

//   '& svg': {
//     position: 'relative',
//     stroke: '$overlay',
//     strokeWidth: 1,
//     zIndex: 1,
//   },
// })

export const StyledRow = styled('div', {
  position: 'relative',
  width: '100%',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  minHeight: '32px',
  outline: 'none',
  color: '$text',
  fontFamily: '$ui',
  fontWeight: 400,
  fontSize: '$1',
  padding: '$2 0 $2 $3',
  borderRadius: 4,
  userSelect: 'none',
  margin: 0,
  display: 'flex',
  gap: '$3',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  variants: {
    variant: {
      tall: {
        alignItems: 'flex-start',
        padding: '0 0 0 $3',
        '& > span': {
          paddingTop: '$4',
        },
      },
    },
  },
})

const StyledGroup = styled(DropdownMenu.DropdownMenuRadioGroup, {
  display: 'flex',
  flexDirection: 'row',
  gap: '$1',
})

const OverlapIcons = styled('div', {
  display: 'grid',
  '& > *': {
    gridColumn: 1,
    gridRow: 1,
  },
})

const FontIcon = styled('div', {
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$3',
  variants: {
    fontStyle: {
      [FontStyle.Script]: {
        fontFamily: 'Caveat Brush',
      },
      [FontStyle.Sans]: {
        fontFamily: 'Recursive',
      },
      [FontStyle.Serif]: {
        fontFamily: 'Georgia',
      },
      [FontStyle.Mono]: {
        fontFamily: 'Recursive Mono',
      },
    },
  },
})
