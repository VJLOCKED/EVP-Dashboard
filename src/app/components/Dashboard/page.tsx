// 'use client'

// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import EVCountChart from '../EVCountChart/page'
// import TopManufacturersChart from '../TopManufacturersChart/page'
// import EVTypesPieChart from '../EVTypesPieChart/page'
// import EVTypeByYearChart from '../EVTypeByYearChart/page'
// import PostalCodeChart from '../PostalCodeChart/page'
// import ModelTypeCensus from '../ModelTypeCensus/page'
// import CAFVEligibilityChart from '../CAFVEligibilityChart/page'
// import CountyCityChart from '../CountyCityChart/page'
// import DataTable from '../DataTable/page'
// import { motion } from 'framer-motion'

// export default function Dashboard() {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetch('/api/ev-data')
//       .then(response => response.json())
//       .then(data => {
//         setData(data)
//         setLoading(false)
//       })
//   }, [])

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>
//   }

//   return (
//     <div className="container mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen font-sans">
//       <motion.h1 
//         className="text-5xl font-bold mb-8 text-center text-gray-800"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Electric Vehicle Population Dashboard
//       </motion.h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <CardHeader>
//               <CardTitle className="text-lg text-gray-700">Total EVs</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-4xl font-bold text-blue-600">{data.length.toLocaleString()}</p>
//             </CardContent>
//           </Card>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <CardHeader>
//               <CardTitle className="text-lg text-gray-700">Unique Makes</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-4xl font-bold text-green-600">{new Set(data.map(item => item.Make)).size}</p>
//             </CardContent>
//           </Card>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <CardHeader>
//               <CardTitle className="text-lg text-gray-700">Latest Model Year</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-4xl font-bold text-purple-600">{Math.max(...data.map(item => item['Model Year']))}</p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//       <Tabs defaultValue="charts" className="space-y-6">
//         <TabsList className="bg-white shadow-md rounded-full">
//           <TabsTrigger value="charts" className="text-lg">Charts</TabsTrigger>
//           <TabsTrigger value="data" className="text-lg">Data Table</TabsTrigger>
//         </TabsList>
//         <TabsContent value="charts" className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="bg-white shadow-lg  hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl text-gray-800">EV Count by Year</CardTitle>
//               </CardHeader>
//               <CardContent className="h-80">
//                 <EVCountChart data={data} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl text-gray-800">Top 10 Manufacturers</CardTitle>
//               </CardHeader>
//               <CardContent className="h-80">
//                 <TopManufacturersChart data={data} />
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl text-gray-800">EV Types Distribution</CardTitle>
//               </CardHeader>
//               <CardContent className="h-80">
//                 <EVTypesPieChart data={data} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl text-gray-800">EV Type by Year</CardTitle>
//               </CardHeader>
//               <CardContent className="h-80">
//                 <EVTypeByYearChart data={data} />
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl text-gray-800">Postal Code Distribution</CardTitle>
//               </CardHeader>
//               <CardContent className="h-80">
//                 <PostalCodeChart data={data} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl text-gray-800">Top Model Types</CardTitle>
//               </CardHeader>
//               <CardContent className="h-80">
//                 <ModelTypeCensus data={data} />
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl text-gray-800">CAFV Eligibility</CardTitle>
//               </CardHeader>
//               <CardContent className="h-80">
//                 <CAFVEligibilityChart data={data} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl text-gray-800">Top Counties and Cities</CardTitle>
//               </CardHeader>
//               <CardContent className="h-80">
//                 <CountyCityChart data={data} />
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//         <TabsContent value="data">
//           <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <CardContent>
//               <DataTable data={data} />
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EVCountChart from '../EVCountChart/page'
import TopManufacturersChart from '../TopManufacturersChart/page'
import EVTypesPieChart from '../EVTypesPieChart/page'
import EVTypeByYearChart from '../EVTypeByYearChart/page'
import PostalCodeChart from '../PostalCodeChart/page'
import ModelTypeCensus from '../ModelTypeCensus/page'
import CAFVEligibilityChart from '../CAFVEligibilityChart/page'
import CountyCityChart from '../CountyCityChart/page'
import DataTable from '../DataTable/page'

export default function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ev-data')
      .then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
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
            <p className="text-4xl font-bold text-primary">{data.length.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Unique Makes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-secondary">{new Set(data.map(item => item.Make)).size}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Latest Model Year</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-accent">{Math.max(...data.map(item => item['Model Year']))}</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList className="bg-card">
          <TabsTrigger value="charts" className="text-lg">Charts</TabsTrigger>
          <TabsTrigger value="data" className="text-lg">Data Table</TabsTrigger>
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
                <CardTitle className="text-xl">Postal Code Distribution</CardTitle>
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
                <CardTitle className="text-xl">Top Counties and Cities</CardTitle>
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
  )
}