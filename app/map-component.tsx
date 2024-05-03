import { Fragment, cloneElement } from "react"
import { pk } from "../interfaces"

const MapComponent = <T extends pk,> ({children, items}: {children: React.JSX.Element, items?: Iterable<T>}) => {
  return items && [...items].map((item, key) => {
    return <Fragment key={key}>{cloneElement(children, { ...item })}</Fragment>
  })
}

export default MapComponent