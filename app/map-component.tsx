import { Fragment, cloneElement } from "react"
import { pk } from "../interfaces"

const MapComponent = <T extends pk,> ({children, items}: {children: React.JSX.Element, items?: Iterable<T>}) => (
  items && [...items].map((item, key) => <Fragment key={key}>{cloneElement(children, { ...item, key })}</Fragment>)
)

export default MapComponent