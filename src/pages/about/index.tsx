/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { Footer, NavBar } from "@/components";
import Head from "next/head";
import { api } from "@/services";
import axios from "axios";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);

  const getUsers = async () => {
    setLoading(true)
    try {
        const {data: aleResponse} = await axios.get('https://api.github.com/users/alehsouza')
        const {data: mariResponse} = await axios.get('https://api.github.com/users/mariana-santos')
        setUsers([aleResponse, mariResponse])
    }catch(err){
        console.error(err)
    }
    setLoading(false)
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
      <Head>
        <title>Valorant - Sobre</title>
      </Head>
      <NavBar />
      <Box
        py={"40px"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Text
          fontSize={{ base: "40px", sm: "40px", md: "40px", lg: "40px" }}
          textAlign={"center"}
        >
          Desenvolvido por
        </Text>
      </Box>
      <Box
        minH={"70vh"}
        p={{ base: "40px", sm: "40px", md: "80px", lg: "40px 200px" }}
        flexWrap={{ base: "wrap", sm: "wrap", md: "wrap", lg: "nowrap" }}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        {!loading &&
          users.length > 0 &&
          users.map((user: any, index: any) => {
            return (
              <Box
                key={index}
                mb={"20px"}
                width={"80%"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                <Box
                  width={"300px"}
                  borderRadius={"100%"}
                  border="8px solid #ff4656"
                  overflow={"hidden"}
                >
                  <img src={user.avatar_url} alt="" />
                </Box>
                <Text fontSize={"28px"} p={"12px"}>
                  {user.name}
                </Text>
                <Text fontSize={"18px"}>Front End Developer</Text>
                <Box display={"flex"}>
                  <Box p={"12px"}>
                    <a
                      href="https://github.com/AlehSouza"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Box>
                  {user.blog && (
                    <Box p={"12px"}>
                      <a
                        href={user.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Blog
                      </a>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        {loading && users.length <= 0 && (
          <Flex
            width={"100%"}
            height={"80vh"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#ff4656"
              size="xl"
            />
          </Flex>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Index;
