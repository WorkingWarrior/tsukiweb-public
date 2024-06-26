import { Fragment, useEffect, useState } from 'react'
import Fancybox from "../components/molecules/Fancybox"
import '../styles/gallery.scss'
import { settings } from '../utils/variables'
import { motion } from 'framer-motion'
import { CharacterId, GALLERY_IMAGES, GalleryImg } from '../utils/gallery'
import strings, { imageUrl } from '../utils/lang'
import { SCREEN } from '../utils/display'
import TabsComponent from '../components/molecules/TabsComponent'
import MenuButton from '../components/atoms/MenuButton'
import { useLanguageRefresh } from '../components/hooks/useLanguageRefresh'
import { useScreenAutoNavigate } from '../components/hooks/useScreenAutoNavigate'

type GalleryItem = GalleryImg & {src_thumb: string, src_hd: string}

const defaultThumbnail = imageUrl("notreg", "thumb")

const GalleryScreen = () => {
  useScreenAutoNavigate(SCREEN.GALLERY)
  useLanguageRefresh()
  const [selected, setSelected] = useState<CharacterId>("ark")
  const [images, setImages] = useState<GalleryItem[]>([])

  useEffect(()=> {
    let imagesTmp: any[] = GALLERY_IMAGES[selected]
    if (imagesTmp == undefined)
      throw Error(`unknown character ${selected}`)
    
    imagesTmp = imagesTmp.map((image: GalleryImg) => {
      const name = `event/${image.img}`
      const [thumb, hd] = settings.eventImages.includes(name) || window.unlock
                  ? [imageUrl(name, 'thumb'), imageUrl(name, 'hd')]
                  : [defaultThumbnail, undefined]

      return {...image, src_thumb: thumb, src_hd: hd}
    })

    setImages(imagesTmp)

    document.querySelector('.gallery-container')?.scrollTo(0, 0)
  }, [selected])

  return (
    <motion.div
      className="page" id="gallery"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <div className="page-content">        
        <main>
          <h2 className="page-title">{strings.extra.gallery}</h2>
          <TabsComponent
            tabs={Object.keys(GALLERY_IMAGES)}
            selected={selected}
            setSelected={setSelected}
            textModifier={text => strings.characters[text as CharacterId]} />

          <Fancybox className='gallery-container'
            options={{
              Toolbar: false,
              Thumbs: false,
            } as any}>
            {images.map(({src_hd, src_thumb, ...image}) =>
              <Fragment key={image.img}>
                {src_thumb === defaultThumbnail ?
                  <div className="placeholder" />
                :
                  <a href={src_hd} data-fancybox="gallery"
                    className={image.sensitive && settings.blurThumbnails ? 'blur' : ''}>
                    <img src={src_thumb} alt={`event ${image.img}`} draggable={false} />
                  </a>
                }
              </Fragment>
            )}
          </Fancybox>

          <MenuButton to={SCREEN.TITLE} className="back-button">
            {strings.back}
          </MenuButton>
        </main>
      </div>
    </motion.div>
  )
}

export default GalleryScreen