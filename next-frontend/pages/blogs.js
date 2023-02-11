import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { createClient } from "next-sanity";
import PortableText from "react-portable-text"
import Script from "next/script"
import { useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import NavBar from '../components/NavBar';

const Blogs = ({blogs}) => {
    const client = createClient({
        projectId: "i6d1pi85",
        dataset: "production",
        useCdn: false
      });}
      const builder = imageUrlBuilder(client)
      
      useEffect(() => {
        console.log("thanks") 
        
      }, [])
const blogs = () => {
    return (
        <div>
            <NavBar/>
            <div className="bg-grey-50" id="blog">
                <div className="container mx-auto py-16 md:py-20">
                    <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                        I also like to write
                    </h2>
                    <h4 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                        Check out my latest posts!
                    </h4>
                    <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">

                        {blogs.map((item) => {
                            return <Link key={item.slug.current} href={"/blog/" + item.slug.current} className="shadow">
                                <div><div style={{ "backgroundImage": `url(${builder.image(item.blogimage).width(200).url() || '/assets/img/post-01.png'})` }}
                                    className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72">
                                    <span
                                        className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                                    <span
                                        className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base cursor-pointer">Read
                                        More</span>
                                </div>
                                    <div className="bg-white py-6 px-5 xl:py-8">
                                        <span className="block font-body text-lg font-semibold text-black"> {item.title}</span>
                                        <span className="block pt-2 font-body text-grey-20">{item.metadesc}</span>
                                    </div></div>
                            </Link>
                        })}
                        {/* <a href="/post" className="shadow">
              <div style={{"backgroundImage": "url(/assets/img/post-02.png)"}}
                className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72">
                <span
                  className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                <span
                  className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base">Read
                  More</span>
              </div>
              <div className="bg-white py-6 px-5 xl:py-8">
                <span className="block font-body text-lg font-semibold text-black">My personal productivity system</span>
                <span className="block pt-2 font-body text-grey-20">Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              </div>
            </a>
            <a href="/post" className="shadow">
              <div style={{"backgroundImage": "url(/assets/img/post-03.png)"}}
                className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72">
                <span
                  className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                <span
                  className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base">Read
                  More</span>
              </div>
              <div className="bg-white py-6 px-5 xl:py-8">
                <span className="block font-body text-lg font-semibold text-black">My year in review 2020</span>
                <span className="block pt-2 font-body text-grey-20">Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              </div>
            </a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default blogs

export async function getServerSideProps(context) {
    const client = createClient({
        projectId: 'i6d1pi85',
        dataset: "production",
        useCdn: false
    });
    const query = `*[_type == "blog"][0...3]`;
    const blogs = await client.fetch(query);

    const profileQuery = `*[_type == "profile"][0]`;
    const profile = await client.fetch(profileQuery);

    return {
        props: {
            blogs,
            profile
        }
    }
}
