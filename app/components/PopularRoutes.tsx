import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { PopularRoute } from "@/app/dti/PopularRoute";
import { usePopularRoutesService } from "@/app/services/TripService";
import { Box, Typography } from "@mui/material";

export default function PopularRoutesTable() {
  const [popularRoutes, setPopularRoutes] = useState<PopularRoute[]>([]);
  const popularRoutesService = usePopularRoutesService();

  useEffect(() => {
    popularRoutesService().then(value => {
      setPopularRoutes(value.data);
    });
  }, [popularRoutesService]);

  return (
    <Box>
        <Typography variant="h4" color="text.primary">
            Маршруты, популярные у наших пользователей
        </Typography>
        <TableContainer
            component={Paper}
            sx={{ mt: 2 }}
            >
            <Table aria-label="Popular Routes Table">
                <TableBody>
                {popularRoutes.map(route => (
                    <TableRow key={`${route.placeFrom}-${route.placeTo}`}>  
                        <TableCell sx={{ borderBottom: "2px solid rgba(247, 248, 250, 1);" }}>
                            <Link
                                href={`/ride-sharing/${route.placeFrom}/${route.placeTo}`}  
                                underline="hover"
                            >
                                <Typography variant="h4" textAlign="center">{route.placeFrom} - {route.placeTo}</Typography>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
}
