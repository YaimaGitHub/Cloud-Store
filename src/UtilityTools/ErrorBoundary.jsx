import React, { Component } from "react";
import { errorMonitor } from "ws";


export class ErrorBoundary extends React.Component
{
  constructor(props)
  {
    super(props)
    {
        this.state={hasError:false, catched:""}

    }
  }

  static getDerivedStateFromError()
  {
    return {hasError:true};
  }

  componentDidCatch(error, errorInfo)
  {
    //loggng the error or send it to a error reporting service
   
    console.log("Error Caught by Error boundary: "+error,errorInfo);
   
  }

  render()
  {
    if(this.state.hasError) return (
        <div className="error">
        <h3>We are sorry... something went wrong</h3>
        <p>We cannot process your request at this moment.</p>
        
        </div>)

    return this.props.children;
  }
}