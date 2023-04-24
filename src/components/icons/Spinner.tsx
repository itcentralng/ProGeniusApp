import React from 'react'
import PropTypes from 'prop-types'

interface Props {
    size: string,
    color?: string
}

export const Spinner = ({ size, color }: Props) => {
    return (
        <>
            <span style={{ fontSize: `${size}rem`, color: color }} className="fa fa-spin fa-spinner"></span>
        </>
    )
}

Spinner.propTypes = {}
