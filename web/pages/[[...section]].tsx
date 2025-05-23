import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { sanityClient, urlFor } from "@/lib/sanity";
import BookCard from "@/components/BookCard";
import ArtworkCard from "@/components/ArtworkCard";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  images: any[];
  description: string;
  tags?: string[];
}

interface Artwork {
  _id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  images: any[];
  description: string;
  tags?: string[];
}

interface HomeProps {
  books: Book[];
  artworks: Artwork[];
  profile: { name: string; bio: string };
}

export default function Home({ books, artworks, profile }: HomeProps) {
  const router = useRouter();
  const [focusedColumn, setFocusedColumn] = useState<"artist" | "designer" | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showBio, setShowBio] = useState(true);
  const [bioClosing, setBioClosing] = useState(false);
  const [bioHeight, setBioHeight] = useState<'auto' | number>('auto');
  const bioRef = useRef<HTMLDivElement>(null);

  // Set initial focus based on route param
  useEffect(() => {
    const section = Array.isArray(router.query.section)
      ? router.query.section[0]
      : router.query.section;
    if (section === "design") {
      setFocusedColumn("designer");
    } else if (section === "art") {
      setFocusedColumn("artist");
    } else {
      setFocusedColumn(null);
    }
  }, [router.query.section]);

  // Animate bio open/close with dynamic height
  useEffect(() => {
    if (bioClosing && bioRef.current) {
      // Closing: set height to current, then to 0
      const el = bioRef.current;
      setBioHeight(el.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBioHeight(0);
        });
      });
      // After transition, hide bio
      const timeout = setTimeout(() => {
        setBioClosing(false);
        setShowBio(false);
      }, 400);
      return () => clearTimeout(timeout);
    } else if (showBio && bioRef.current) {
      // Opening: set height to 0, then to scrollHeight, then to auto
      const el = bioRef.current;
      setBioHeight(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBioHeight(el.scrollHeight);
          setTimeout(() => setBioHeight('auto'), 400);
        });
      });
    }
  }, [bioClosing, showBio]);

  const handleFocus = (section: "artist" | "designer") => {
    if (showBio) {
      setBioClosing(true);
      setTimeout(() => {
        setFocusedColumn(section);
        setActiveTag(null);
        // Update the URL
        if (section === "designer") {
          router.push("/design", undefined, { shallow: true });
        } else if (section === "artist") {
          router.push("/art", undefined, { shallow: true });
        }
      }, 400); // Animation duration
    } else {
      setFocusedColumn(section);
      setActiveTag(null);
      // Update the URL
      if (section === "designer") {
        router.push("/design", undefined, { shallow: true });
      } else if (section === "artist") {
        router.push("/art", undefined, { shallow: true });
      }
    }
  };

  // Toggle bio open/close on header click
  const handleHeaderClick = () => {
    setFocusedColumn(null);
    setActiveTag(null);
    router.push("/", undefined, { shallow: true });
    setShowBio(true);
    setBioClosing(false);
  };

  // Collect all unique tags for each column
  const artworkTags = Array.from(new Set(artworks.flatMap(a => a.tags || [])));
  const bookTags = Array.from(new Set(books.flatMap(b => b.tags || [])));

  // Filter lists by tag for each column
  const filteredArtworks = focusedColumn === "artist" && activeTag
    ? artworks.filter((art) => (art.tags || []).includes(activeTag))
    : artworks;
  const filteredBooks = focusedColumn === "designer" && activeTag
    ? books.filter((book) => (book.tags || []).includes(activeTag))
    : books;

  console.log('Filtered books:', filteredBooks);
  console.log('Filtered artworks:', filteredArtworks);

  const columnsClass =
    (focusedColumn === "artist"
      ? styles.artistFocused
      : focusedColumn === "designer"
      ? styles.designerFocused
      : "") +
    (focusedColumn ? " " + styles.columnsFocused : "");

  return (
    <>
      <Head>
        <title>Mei Lenehan Portfolio</title>
        <meta name="description" content="Portfolio of designer and artist Mei Lenehan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.pageContainer}>
        <div
          className={styles.mainTitle}
          style={{ cursor: 'pointer' }}
          onClick={handleHeaderClick}
        >
          {profile?.name || 'Mei Lenehan'}
        </div>
        {showBio && profile?.bio && (
          <div
            className={styles.bio + (bioClosing ? ' ' + styles.bioClosingHeight : '')}
            ref={bioRef}
            style={{
              height: bioHeight === 'auto' ? 'auto' : bioHeight + 'px',
            }}
          >
            {profile.bio}
          </div>
        )}
        <div className={`${styles.columnsWrapper} ${columnsClass}`}>
          <div className={styles.columnsHeaderRow}>
            <div
              className={styles.columnHeaderLeft}
              style={{ cursor: 'pointer' }}
              onClick={() => handleFocus('designer')}
            >
              Designer
            </div>
            <div
              className={styles.columnHeaderRight}
              style={{ cursor: 'pointer' }}
              onClick={() => handleFocus('artist')}
            >
              Artist
            </div>
          </div>
          <div className={styles.filtersRow}>
            <div className={styles.filtersCell + ' ' + styles.columnHeaderLeft}>
              {focusedColumn === 'designer' && (
                <div className={styles.filters}>
                  {bookTags.map((tag) => (
                    <span
                      key={tag}
                      className={`${styles.tag} ${activeTag === tag ? styles.activeTag : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTag(tag === activeTag ? null : tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.filtersCell + ' ' + styles.columnHeaderRight}>
              {focusedColumn === 'artist' && (
                <div className={styles.filters}>
                  {artworkTags.map((tag) => (
                    <span
                      key={tag}
                      className={`${styles.tag} ${activeTag === tag ? styles.activeTag : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTag(tag === activeTag ? null : tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.columnsRow}>
            <div className={styles.columnLeft}>
              <div className={styles.columnContent}>
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book._id}
                    title={book.title}
                    author={book.author}
                    publisher={book.publisher}
                    year={book.year}
                    coverUrl={book.images 
                      ? book.images.map(img => urlFor(img).width(1200).quality(90).url())
                      : ["/placeholder.svg"]
                    }
                    description={book.description}
                  />
                ))}
              </div>
            </div>
            <div className={styles.columnRight}>
              <div className={styles.columnContent}>
                {filteredArtworks.map((art) => (
                  <ArtworkCard
                    key={art._id}
                    title={art.title}
                    year={art.year}
                    medium={art.medium}
                    dimensions={art.dimensions}
                    imageUrl={art.images 
                      ? art.images.map(img => urlFor(img).width(1200).quality(90).url())
                      : ["/placeholder.svg"]
                    }
                    description={art.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const books = await sanityClient.fetch(`*[_type == "design"] | order(year desc){
    _id, title, author, publisher, year, images, description, tags
  }`);
  
  const artworks = await sanityClient.fetch(`*[_type == "artwork"] | order(year desc){
    _id, title, year, medium, dimensions, images, description, tags
  }`);
  
  const profile = await sanityClient.fetch(`*[_type == "profile"][0]{
    name, bio
  }`);
  
  return {
    props: {
      books,
      artworks,
      profile,
    },
  };
}
