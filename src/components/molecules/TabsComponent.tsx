import { Dispatch, SetStateAction } from "react"
import styles from "../../styles/components/tabs.module.scss"

type TabsProps = {
  tabs: any[],
  selected: string,
  setSelected: Dispatch<SetStateAction<any>>,
  textModifier?: (text: string) => string
}

/**
 * Tabs with a default style applied
 */
const TabsComponent = ({ tabs, selected, setSelected, textModifier }: TabsProps) => (
  <div className={styles.tabs}>
    {tabs.map(value =>
      <TabBtn key={value.id}
        text={textModifier ? textModifier(value.label) : value.label}
        active={selected === value.id}
        onClick={() => setSelected(value.id)} />
    )}
  </div>
)

export default TabsComponent


type TabBtnProps = {
  text: string,
  active: boolean,
  onClick: ()=> void
}

const TabBtn = ({text, active, onClick}: TabBtnProps) => (
  <button className={`${styles.tab} ${active ? styles.active : ''}`}
    onClick={onClick}>
    {text}
  </button>
)