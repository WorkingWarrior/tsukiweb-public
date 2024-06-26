import '../styles/endings.scss'
import { motion } from 'framer-motion'
import strings, { imageUrl } from '../utils/lang'
import { SCREEN } from '../utils/display'
import chalkboard from '../assets/images/chalkboard.webp'
import { noBb } from '../utils/Bbcode'
import { RouteEnding, endings, osiete } from '../utils/endings'
import { Tooltip } from 'react-tooltip'
import ReactDOMServer from 'react-dom/server';
import { playScene } from '../utils/savestates'
import MenuButton from '../components/atoms/MenuButton'
import { useLanguageRefresh } from '../components/hooks/useLanguageRefresh'
import { useScreenAutoNavigate } from '../components/hooks/useScreenAutoNavigate'

// settings.completedScenes.push("s521")
const EndingsScreen = () => {
  useScreenAutoNavigate(SCREEN.ENDINGS)
  useLanguageRefresh()

  return (
    <motion.div
      className="page" id="endings"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <div className="page-content">
        <h2 className="page-title">{strings.extra.endings}</h2>
        
        <main>
          <div className="endings-list">
          {Object.values(endings).map((ending, index) => {
            if (ending.seen || window.unlock) {
              return <EndingComponent ending={ending} key={index} />
            } else {
              return <div key={index} className="ending" />
            }
          })}
          </div>

          <div className="badendings-list">
            <h3>{strings.endings.osiete}</h3>
            <Tooltip id="osiete" place="top" className="tooltip" />
            {Object.values(osiete).map((ending, index)=>
              <div key={index} className={`badending ${ending?.seen ? 'seen' : ''}`}>
                {ending?.seen ?
                  <img
                    src={chalkboard}
                    alt={`Bad Ending ${ending.scene}`}
                    draggable={false}
                    onClick={() => playScene(ending.scene)}
                    data-tooltip-id="osiete"
                    data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    <div>
                      {ending.name && <>{noBb(ending.name)}<br /></>}
                      {ending.day && <>Day: {ending.day}<br /></>}
                      {ending.scene}
                    </div>)} />
                : <img src={chalkboard} alt="Bad Ending" draggable={false} />
                }
              </div>
            )}
          </div>
        </main>

        <MenuButton to={SCREEN.TITLE} className="back-button">
          {strings.back}
        </MenuButton>
      </div>
    </motion.div>
  )
}

export default EndingsScreen

const EndingComponent = ({ending:{char, image, name, day, type}}: {ending: RouteEnding}) => {
  return (
    <div className={`ending ${char}`}>
      <img className="ending-img"
        src={imageUrl(`event/${image}`, 'thumb')}
        alt={name} draggable={false} />
      
      <div className="ending-name">
        {noBb(strings.scenario.routes[char][day])}
      </div>
      
      <div className="ending-bottom">
        <div>
          {strings.characters[char]}
        </div>

        <div className="ending-type">
          {type}
        </div>
      </div>
    </div>
  )
}