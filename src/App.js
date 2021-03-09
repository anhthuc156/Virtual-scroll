import { useState } from 'react';
import './App.css';
import faker from 'faker';

const SETTING = {
    rowHeight : 40,
    rowNumber : 1000,
    viewPortHeight: 280,
}

const sources = new Array(SETTING.rowNumber).fill().map((value, index) => (({
    index,
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleName: faker.name.middleName(),
    findName: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    gender: faker.name.gender(),
    prefix: faker.name.prefix(),
    suffix: faker.name.suffix(),
    title: faker.name.title(),
    jobDescriptor: faker.name.jobDescriptor(),
    jobArea: faker.name.jobArea(),
    jobType: faker.name.jobType(),
    phoneNumber: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    email: faker.internet.email()
})));

const colHeaders = [
    "Prefix",
    "First Name",
    "Middle Name",
    "Last Name",
    "Find Name",
    "Suffix",
    "Gender",
    "Title",
    "Job Title",
    "Job Type",
    "Job Description",
    "Job Area",
    "Phone Number",
    "Address",
    "Email"
]

function getInitData () {
    return sources.slice(0, 11);
}

function App() {
    const [data, setData] = useState(getInitData());

    function handleOnScroll (e) {
        const startItemNumber = Math.floor(e.target.scrollTop / SETTING.rowHeight);
        const endItemNumber = startItemNumber + (SETTING.viewPortHeight / SETTING.rowHeight) + 4;
        const newData = sources.slice(startItemNumber, endItemNumber);
        // const newData = sources.filter(item => item.index >= startItemNumber && item.index <= endItemNumber);
        setData(newData);
    };

    function renderColumn () {
        return (
            colHeaders.map((cHeader, idx) => 
                (
                    <div className="col" key={idx}>{cHeader}</div>
                )
            )
        )
    };

    return (
        <div className="App">
            <div className="table">
                <div className="row">
                    {renderColumn()}
                </div>
                <div className="viewport" onScroll={(e) => handleOnScroll(e)} style={{height: `${SETTING.viewPortHeight}px`}}>
                    <div style={{position: "relative", height: `${SETTING.rowHeight * SETTING.rowNumber}px`}}>
                        {data.map((obj) => (
                            <div key={obj.index}
                                className={`row rowContent ${obj.index % 2 === 0 ? 'even' : ''}`}
                                style={{top: `${obj.index * 40}px`}}>
                                    <div className="col">{obj.prefix}</div>
                                    <div className="col">{obj.firstName}</div>
                                    <div className="col">{obj.middleName}</div>
                                    <div className="col">{obj.lastName}</div>
                                    <div className="col">{obj.findName}</div>
                                    <div className="col">{obj.suffix}</div>
                                    <div className="col">{obj.gender}</div>
                                    <div className="col">{obj.title}</div>
                                    <div className="col">{obj.jobTitle}</div>
                                    <div className="col">{obj.jobType}</div>
                                    <div className="col">{obj.jobDescriptor}</div>
                                    <div className="col">{obj.jobArea}</div>
                                    <div className="col">{obj.phoneNumber}</div>
                                    <div className="col">{obj.address}</div>
                                    <div className="col">{obj.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
