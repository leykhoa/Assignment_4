import React, { Component } from 'react';
import Staff from './StaffDetailComponent';
import Header from './HeaderComponent';
import '../App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Departments from './DepartmentComponent';
import Salary from './SalaryComponent';
import StaffList from './StaffListComponent'
import { connect } from 'react-redux';
import { fetchStaffs, fetchDepartments, fetchSalary, addNewStaff, updateStaff, deleteStaff } from '../redux/ActionCreators';
import DepartmentDetail from './DepartmentDetailComponent';
import { ToastContainer } from 'react-toastify';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        salary: state.salary
    }
}
const mapDispatchToProps = dispatch => ({
    addNewStaff: (staffID, fullName, doB, startDate, departmentId, salaryScale, annualLeave, overTime, image) => dispatch(addNewStaff(staffID, fullName, doB, startDate, departmentId, salaryScale, annualLeave, overTime, image)),
    fetchStaffs: () => { dispatch(fetchStaffs()) },
    fetchDepartments: () => { dispatch(fetchDepartments()) },
    fetchSalary: () => { dispatch(fetchSalary()) },
    deleteStaff: (id) => dispatch(deleteStaff(id)),
    updateStaff: (staffID, fullName, doB, startDate, departmentId, salaryScale, annualLeave, overTime, image) => dispatch(updateStaff(staffID, fullName, doB, startDate, departmentId, salaryScale, annualLeave, overTime, image))
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments()
        this.props.fetchSalary()
        console.log('check data staff', this.props.staffs)

    }

    render() {
        const StaffWithId = ({ match }) => {
            return (
                <div>
                    <Staff
                        staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                        departments={this.props.departments.departments}
                        updateStaff={this.props.updateStaff}
                        deleteStaff={this.props.deleteStaff}
                    />
                </div>
            );
        };
        const DepartmentWithId = ({ match }) => {
            return (
                <div>
                    <DepartmentDetail
                        staffs={this.props.staffs.staffs.filter((item) => item.departmentId === match.params.departmentID)}
                        departments={this.props.departments.departments}
                        departmentID={match.params.departmentID}
                    />
                </div>
            );
        };
        return (
            <div>
                <Header className="header" />
                <Switch>
                    <Route exact path='/staffs' component={() =>
                        <StaffList
                            staffs={this.props.staffs.staffs}
                            addNewStaff={this.props.addNewStaff}
                        />} />
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route path='/departments/:departmentID' component={DepartmentWithId} />
                    <Route exact path='/departments' component={() => <Departments departments={this.props.departments.departments} />} />
                    <Route exact path='/salary' component={() => <Salary salary={this.props.salary.salary} />} />
                    <Redirect to="/staffs" />
                </Switch>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));