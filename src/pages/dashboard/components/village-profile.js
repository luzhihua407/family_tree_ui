import React from 'react'
import PropTypes from 'prop-types'
import styles from './village-profile.less'

function VillageProfile({ data }) {
  console.log(data)
  return (
    <div className={styles.village}>
      <div className={styles.inner}>{data && data.remark}</div>
      <div className={styles.footer}>
        <div className={styles.description}>
          <p>{data && data.name}</p>
        </div>
      </div>
    </div>
  )
}

VillageProfile.propTypes = {
  name: PropTypes.string,
  remark: PropTypes.string,
  data: PropTypes.object,
}

export default VillageProfile
