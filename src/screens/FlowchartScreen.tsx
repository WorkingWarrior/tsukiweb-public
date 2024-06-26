import { motion } from "framer-motion"
import '../styles/saves.scss'
import { SCREEN, displayMode } from "../utils/display"
import strings from "../utils/lang"
import { Flowchart } from "../components/Flowchart"
import MenuButton from "../components/atoms/MenuButton"
import { useLanguageRefresh } from "../components/hooks/useLanguageRefresh"
import { useScreenAutoNavigate } from "../components/hooks/useScreenAutoNavigate"

const FlowchartScreen = () => {
  useScreenAutoNavigate(SCREEN.SCENES)
  useLanguageRefresh()

  function back(sceneLoaded: boolean) {
    if (!sceneLoaded)
      displayMode.screen = SCREEN.TITLE
  }
  return (
    <motion.div
      className="page" id="scenes"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <div className="page-content">
        <div className="header">
          <MenuButton to={SCREEN.TITLE}>
            {strings.back}
          </MenuButton>
          <div>WIP, use only to replay not to progress the story</div>
        </div>

        <Flowchart back={back}/>
      </div>
    </motion.div>
  )
}

export default FlowchartScreen