import React from 'react';
import {
    Col, Breadcrumb, BreadcrumbItem, CardTitle, CardImg
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/department.scss'

const DepartmentDetail = (props) => {
    const department = props.departments.find((item) => item.id === props.departmentID);
    if (props.staffs != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/departments' className="text-decoration-none">Phòng Ban</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{department && department.name}</BreadcrumbItem>
                    </Breadcrumb>
                    {props.staffs.map((staff) => {
                        return (
                            < Col key={staff.id} xs={6} md={4} lg={2}>
                                <RenderDepartment item={staff} />
                            </Col>
                        )
                    })}
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}

const RenderDepartment = ({ item }) => {
    return (
        <Link className="text-decoration-none" to={`/staffs/${item.id}`} key={item.id}>
            <Col key={item.id} >
                <CardImg width="100%" src={item.image} alt={item.name} />
                <CardTitle style={{ textAlign: "center" }}>{item.name}</CardTitle>
            </Col>
        </Link>
    );
}

export default DepartmentDetail;





