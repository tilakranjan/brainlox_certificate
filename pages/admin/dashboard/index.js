import React from 'react'
import Link from '@/utils/ActiveLink'
import PageBanner from '@/components/Common/PageBanner'

const index = () => {

  return (
        <React.Fragment>
            <PageBanner
                pageTitle="Admin Dashboard"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Admin Dashboard"
            />

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4">
                            <div className="td-sidebar">
                                <ul>
                                    <li>
                                        <Link href="/admin/pending-requests" activeClassName="active">
                                            <a>Pending Requests</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/courses" activeClassName="active">
                                            <a>All Courses</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/curriculum" activeClassName="active">
                                            <a>Course Curriculum</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/appsettings" activeClassName="active">
                                            <a>App Settings</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/brainlox-cash" activeClassName="active">
                                            <a>Brainlox Cash</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-8">
                            <div className="td-text-area">
                                <h4>Admin Dashboard</h4>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                                <ul>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
  )
}

export default index