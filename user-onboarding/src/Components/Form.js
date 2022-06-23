import React from 'react';

export default function Form(props) {
    const {
        values, 
        change,
        submit,
        errors,
        disabled
    } = props
    
    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
    }

    return (
        <div>
            <h1>My Form</h1>
            <p>{errors.username}</p>
            <p>{errors.email}</p>
            <p>{errors.password}</p>
            <p>{errors.tos}</p>
            <form onSubmit={onSubmit}>
                <label> Name:
                    <input 
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={onChange}
                    />
                </label>
                <label> Email:
                    <input 
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={onChange}
                    />
                </label>
                <label> Password:
                    <input 
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={onChange}
                    />
                </label>
                <label> Terms of Service:
                    <input 
                        type="checkbox"
                        name="tos"
                        checked={values.tos}
                        onChange={onChange}
                    />
                </label>
                <input 
                    disabled={disabled}
                    type="submit"
                    value="create friend"
                />
            </form>
        </div>
    )
}