import React from 'react'
import SideBar from '../../components/SideBar'
import { usePageTitle } from '../../utils/usePageTitle'
import UnitForm from '../../components/UnitForm'

const UnitCreateForm:React.FC = () => {

    usePageTitle('Create Unit')
   

  return (
    <div>
        <SideBar/>
        <UnitForm/>
    </div>
  )
}

export default UnitCreateForm