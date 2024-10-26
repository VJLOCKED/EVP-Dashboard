"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import EVCountChart from "../EVCountChart/page";
import TopManufacturersChart from "../TopManufacturersChart/page";
import EVTypesPieChart from "../EVTypesPieChart/page";
import EVTypeByYearChart from "../EVTypeByYearChart/page";
import PostalCodeChart from "../PostalCodeChart/page";
import ModelTypeCensus from "../ModelTypeCensus/page";
import CAFVEligibilityChart from "../CAFVEligibilityChart/page";
import CountyCityChart from "../CountyCityChart/page";
import DataTable from "../DataTable/page";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ev-data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-background to-muted min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
        Electric Vehicle Population Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total EVs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              {data.length.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Unique Makes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-secondary">
              {new Set(data.map((item) => item.Make)).size}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Latest Model Year</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-accent">
              {Math.max(...data.map((item) => item["Model Year"]))}
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList className="bg-card">
          <TabsTrigger value="charts" className="text-lg">
            Charts
          </TabsTrigger>
          <TabsTrigger value="data" className="text-lg">
            Data Table
          </TabsTrigger>
        </TabsList>
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">EV Count by Year</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <EVCountChart data={data} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Top 10 Manufacturers</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <TopManufacturersChart data={data} />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">EV Types Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <EVTypesPieChart data={data} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">EV Type by Year</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <EVTypeByYearChart data={data} />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Postal Code Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PostalCodeChart data={data} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Top Model Types</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ModelTypeCensus data={data} />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">CAFV Eligibility</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <CAFVEligibilityChart data={data} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Top Counties and Cities
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <CountyCityChart data={data} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="data">
          <Card>
            <CardContent>
              <DataTable data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
