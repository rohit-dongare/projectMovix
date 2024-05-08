import React, { useState } from 'react'

import "./style.scss"

const SwitchTabs = ({
    data,
    onTabChange
}) => {

    //bydefault first tab will always be selected
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);//helps to change the bg of the selected tab

  const activeTab = (tab, index) => {
      setLeft(index*100)//100px is the width of the tab item and also the moving background
     
      setTimeout(() => {
          setSelectedTab(index)
      }, 300);//for smooth transition

      onTabChange(tab, index);
  }

  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {data.map((tab, index) => (
                <span 
                onClick={() => activeTab(tab, index)}
                key={index} 
                className={`tabItem ${selectedTab === index ? "active" : ""}`}
                >
                 {tab}
                </span>
            ) ) }
            <span className="movingBg" style={{left}} />
        </div>
    </div>
  )
}

export default SwitchTabs