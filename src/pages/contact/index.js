/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react'
import { graphql } from 'gatsby'
import ReCaptcha from 'react-recaptcha'
import Layout from '../../components/layout'
import { Form, FormGroup, FormLabel } from '~components/common/form'

const reasons = [
  'I have questions about the state data grades',
  'I have feedback on the COVID Racial Data Tracker',
  "I'm a journalist with a media question",
  'I want to report an issue with the website or web accessibility',
  'I want to report an issue with your data',
  'Something else!',
]

export default ({ data }) => {
  const [name, setName] = useState('')
  const [reason, setReason] = useState(reasons[0])
  return (
    <Layout
      title="Contact"
      description="The COVID Tracking Project runs on the effort and diligence of hundreds of volunteers, and we welcome your contribution."
      narrow
      textHeavy
    >
      <div
        className="module-content"
        dangerouslySetInnerHTML={{
          __html:
            data.allContentfulSnippet.edges[0].node
              .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
        }}
      />
      <Form>
        <form
          method="POST"
          name="fa-form-1"
          action="https://webhook.frontapp.com/forms/c3c09a5603c02d2b7f86/KU--_qKvaSkUZHR2T92KQZ8hy5TatxTkRexeSE4NtpFltSVYROQxxbkIdSNH3RcHlZUI4RGGlHL7NwDr00Ki8WMFSOoBBMmgZ28PppSbXx-SQVi51ogAj28bbn6M"
          encType="multipart/form-data"
          acceptCharset="utf-8"
          referrerpolicy="unsafe-url"
        >
          <FormGroup>
            <FormLabel htmlFor="contact-reason">
              What are you contacting us about?
            </FormLabel>
            <select
              id="fontact-reason"
              name="reason"
              onChange={event => setReason(event.target.value)}
            >
              {reasons.map(value => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="contact-name">Your name</FormLabel>
            <input
              type="text"
              name="name"
              id="contact-name"
              onChange={event => setName(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="contact-email">Your email address</FormLabel>
            <input type="email" name="email" id="contact-email" />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="contact-message">Message</FormLabel>
            <textarea name="body" id="contact-message" />
          </FormGroup>
          <FormGroup>
            {typeof window !== 'undefined' && (
              <ReCaptcha
                sitekey={data.site.siteMetadata.recaptchaKey}
                elementID="contact-form-captcha"
              />
            )}
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              aria-hidden
              style={{ display: 'none' }}
              name="subject"
              tabIndex="-1"
              value={`${name} - ${reason}`}
            />
            <button type="submit">Contact us</button>
          </FormGroup>
        </form>
      </Form>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        recaptchaKey
      }
    }
    allContentfulSnippet(filter: { slug: { eq: "contact-page-form" } }) {
      edges {
        node {
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
