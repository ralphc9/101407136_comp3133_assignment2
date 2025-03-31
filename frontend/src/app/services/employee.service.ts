import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  SEARCH_EMPLOYEES,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from '../graphql/employee.operations';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private apollo: Apollo) {}
  
  getEmployees(): Observable<Employee[]> {
    return this.apollo.watchQuery<{ getEmployees: Employee[] }>({
      query: GET_EMPLOYEES
    }).valueChanges.pipe(
      map(result => result.data.getEmployees)
    );
  }
  
  getEmployee(id: string): Observable<Employee> {
    return this.apollo.watchQuery<{ getEmployee: Employee }>({
      query: GET_EMPLOYEE,
      variables: { id }
    }).valueChanges.pipe(
      map(result => result.data.getEmployee)
    );
  }
  
  searchEmployees(department?: string, position?: string): Observable<Employee[]> {
    return this.apollo.watchQuery<{ searchEmployees: Employee[] }>({
      query: SEARCH_EMPLOYEES,
      variables: { department, position }
    }).valueChanges.pipe(
      map(result => result.data.searchEmployees)
    );
  }
  
  addEmployee(employee: Employee): Observable<Employee> {
    return this.apollo.mutate<{ addEmployee: Employee }>({
      mutation: ADD_EMPLOYEE,
      variables: employee,
      refetchQueries: [{ query: GET_EMPLOYEES }]
    }).pipe(
      map(result => result.data?.addEmployee as Employee)
    );
  }
  
  updateEmployee(employee: Partial<Employee> & { id: string }): Observable<Employee> {
    return this.apollo.mutate<{ updateEmployee: Employee }>({
      mutation: UPDATE_EMPLOYEE,
      variables: employee,
      refetchQueries: [{ query: GET_EMPLOYEES }]
    }).pipe(
      map(result => result.data?.updateEmployee as Employee)
    );
  }
  
  deleteEmployee(id: string): Observable<{ id: string }> {
    return this.apollo.mutate<{ deleteEmployee: { id: string } }>({
      mutation: DELETE_EMPLOYEE,
      variables: { id },
      refetchQueries: [{ query: GET_EMPLOYEES }]
    }).pipe(
      map(result => result.data?.deleteEmployee as { id: string })
    );
  }
}