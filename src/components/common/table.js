import React from 'react'
import classnames from 'classnames'
import DetailText from './detail-text'
import tableStyle from './table.module.scss'

const Th = ({
  children,
  colSpan,
  header,
  isFirst,
  alignLeft,
  columnWidth,
  wide,
}) => {
  const thClasses = []
  if (alignLeft) {
    thClasses.push(tableStyle.alignLeft)
  }
  if (isFirst) {
    thClasses.push(tableStyle.borderLeft)
  }
  if (wide) {
    thClasses.push(tableStyle.wide)
  }

  const role = 'text'

  return (
    <th scope="col" colSpan={colSpan} className={classnames(thClasses)}>
      <span role={role}>
        {children}
        {header && (
          <span
            className={`${
              isFirst ? tableStyle.headerLabel : tableStyle.headerLabelHidden
            }${
              columnWidth &&
              typeof tableStyle[`headerLabel${columnWidth}`] !== 'undefined'
                ? ` ${tableStyle[`headerLabel${columnWidth}`]}`
                : ''
            }`}
          >
            {header}
          </span>
        )}
      </span>
    </th>
  )
}

const Td = ({ children, alignLeft, isFirst }) => {
  let tdClasses
  if (alignLeft || isFirst)
    tdClasses = `${alignLeft ? tableStyle.alignLeft : ''} ${
      isFirst ? tableStyle.borderLeft : ''
    }`
  return <td className={tdClasses}>{children}</td>
}

const Table = ({ children, tableLabel }) => (
  <div>
    <table className={tableStyle.table}>{children}</table>
    {tableLabel && <DetailText>{tableLabel}</DetailText>}
  </div>
)

export { Th, Td, Table }
