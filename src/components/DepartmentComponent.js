import { Col, Card, Breadcrumb, BreadcrumbItem } from "reactstrap"
import React from 'react'
import { Link } from 'react-router-dom'
import '../css/department.scss'
import { FadeTransform } from 'react-animation-components'

const Departments = (props) => {
    const department = props.departments
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem active>Phòng Ban</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {department.map((department) => {
                    return (
                        <Col key={department.id} xs={12} md={6} lg={4}>
                            <RenderDepartment department={department} />
                        </Col>
                    )
                })}

            </div>

        </div>
    )
}

const RenderDepartment = ({ department }) => {
    console.log('check department', department)
    return (
        <FadeTransform in transformProps={{ enterTransform: 'translateX(20px)' }}>
            <Card>
                <Link className="text-decoration-none department link-primary" to={`/departments/${department.id}`} >
                    <h4>{department.name}</h4>
                    <p className="link-dark">Số lượng nhân viên: <b>{department.numberOfStaff}</b></p>
                </Link>
            </Card>
        </FadeTransform>

    )
}

export default Departments;

