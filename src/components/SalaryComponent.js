import React from "react";
import {
    Breadcrumb, BreadcrumbItem, Col, ListGroup, ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { FadeTransform } from 'react-animation-components'


const Salary = (props) => {

    const salaryInfo = props.salary.map((staff) => {
        return (

            <Col xs={12} md={6} lg={4} key={staff.id}>
                <FadeTransform in transformProps={{ enterTransform: 'translateX(20px)' }}>
                    <ListGroup>
                        <ListGroupItem style={{ backgroundColor: "lightblue" }}><h4>{staff.name}</h4></ListGroupItem>
                        <ListGroupItem>Mã nhân viên:  <b>{staff.id}</b></ListGroupItem>
                        <ListGroupItem>Hệ số lương: <b>{staff.salaryScale}</b></ListGroupItem>
                        <ListGroupItem>Số giờ làm thêm:<b>{staff.overTime}</b></ListGroupItem>
                        <ListGroupItem>Lương: <NumberFormat value={staff.salary} thousandSeparator={true} style={{ border: "none", fontWeight: "bolder", maxWidth: "90px" }} /><b>VNĐ</b></ListGroupItem>
                    </ListGroup>
                </FadeTransform>
            </Col>

        );
    })

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/salary'>Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">{salaryInfo}</div>
        </div>
    );
}


export default Salary;