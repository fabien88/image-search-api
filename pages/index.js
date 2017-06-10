import Head from 'next/head'
import React from 'react'
import NoSSR from 'react-no-ssr';
import OfflineRuntime from '../components/OfflineRuntime';

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return { host: req.headers.host };
  }
  render () {
    const { host } = this.props;

    return (
    <div>

        <Head>
            <title>Image search service</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        </Head>
        <div className="container">
            <h1 className="header">
                FreeCodeCamp Image search API service
            </h1>
            <blockquote>
                User stories:
                <ul>1) I can get the image URLs, alt text and page urls for a set of images relating to a given search string.</ul>
                <ul><code>https://{host}/api/search?term=unicorn</code></ul>
                <ul>2) I can paginate through the responses by adding a &offset=1 parameter to the URL.</ul>
                <ul><code>https://{host}/api/search?term=unicorn&offset=1</code></ul>
                <ul>3) I can get a list of the most recently submitted search strings.</ul>
                <ul><code>https://{host}/api/latest</code></ul>
            </blockquote>
            <h3>Example search output</h3>
            <pre>{`
              [
                {
                "url": "https://19818-presscdn-pagely.netdna-ssl.com/wp-content/uploads/8b4/7e/8875127b2a4e7a071608757abbb03874.jpg",
                "snippet": "Unicorn Poop? 25 Times We Took the Unicorn Trend Too Far",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5MfQAaqcRzFFtjN_qa-XhFOi-fh09PT5vdjlRWaiVdHcpwnzpjIM66KDM",
                "context": "https://www.dailydot.com/unclick/unicorn-poop-snot-tears/"
                },
                {
                "url": "http://i.huffpost.com/gen/2424200/images/o-UNICORN-facebook.jpg",
                "snippet": "A Touch Of Glass #22: Unicorns",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIdSxJQqmhu3n_-Zmh3MrLPM2y3rkcSrEisyHX3VxeSTvuvVmIBe0-F6A",
                "context": "http://herb.co/2016/05/14/touch-glass-unicorns/"
                },
                ...
              `}</pre>
        </div>
    </div>
    )
  }
}
