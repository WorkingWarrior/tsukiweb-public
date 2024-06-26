import { useEffect, useState, memo, Fragment } from "react"
import moonIcon from '../assets/icons/icon_moon.svg'
import pageIcon from '../assets/icons/icon_bars.svg'
import { settings } from "../utils/variables"
import { observe, useObserved, useObserver } from "../utils/Observer"
import history from "../utils/history"
import { SCREEN, displayMode } from "../utils/display"
import { DivProps } from "../types"
import { BBTypeWriter, Bbcode } from "../utils/Bbcode"
import { resetSI, scriptInterface } from "../utils/text"

export const icons: Record<"moon"|"page", string> = {
  "moon": moonIcon,
  "page": pageIcon
}

observe(displayMode, 'screen', resetSI, {filter: s => s != SCREEN.WINDOW})

type Props = { } & DivProps

const TextLayer = ({...props}: Props) => {

  const [ display ] = useObserved(displayMode, 'text')
  const [ lines, setLines ] = useState<string[]>([])
  const [ immediate ] = useObserved(scriptInterface, 'fastForward')
  const [ glyph ] = useObserved(scriptInterface, 'glyph')

  useEffect(()=> {
    if (glyph) {
      scriptInterface.onFinish?.()
      if (!displayMode.text)
        displayMode.text = true
    }
  }, [glyph])

  useObserver((text)=> {
    const trimmed = text.trimEnd()
    if (trimmed.length == 0)
      setLines([])
    else {
      setLines(trimmed.split('\n'))
      if (!displayMode.text && text.length > 0)
        displayMode.text = true
    }
  }, scriptInterface, 'text')

  const {className, ...remaining_props} = props
  const classList = ['layer']
  if (!display || (lines.length == 0)) classList.push('hide')
  if (className) classList.push(className)
  const [previousLines, lastLine] = [lines.slice(0, lines.length-1), lines[lines.length-1]]
  
  const glyphNode = glyph && <span><img src={icons[glyph]} alt={glyph} id={glyph} className="cursor" /></span>

  return (
    <div className={classList.join(' ')} {...remaining_props} id="layer-text">
      <div className="text-container">
        {previousLines.map((line, i) =>
        <Fragment key={i}>
          {line && <Bbcode text={line} />}
          <br/>
        </Fragment>)}

        {lastLine ?
          <BBTypeWriter key={history.length*100 + lines.length}
            charDelay={immediate ? 0 : settings.textSpeed}
            text={lastLine}
            hideTag="hide"
            onFinish={()=> { scriptInterface.onFinish?.() }}
            rootSuffix={glyphNode}/>
        : glyphNode
        }
        
      </div>
    </div>
  )
}

export default memo(TextLayer)
