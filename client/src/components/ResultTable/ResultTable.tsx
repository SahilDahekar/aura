import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Info, ShieldAlert, Copy, CheckCheck, Filter } from 'lucide-react';

// Define interfaces for type safety
interface Alert {
  name: string;
  riskcode: string;
  count: string;
  desc: string;
}

interface Site {
  '@name': string;
  alerts: Alert[];
}

interface ResultTableProps {
  data: {
    site: Site[];
  };
}

const ResultTable: React.FC<ResultTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [filters, setFilters] = useState({
    low: true,
    medium: true,
    high: true,
    critical: true
  });
  const itemsPerPage = 10;

  // Risk code to severity mapping
  const getRiskSeverity = (riskCode: string): string => {
    switch (riskCode) {
      case '3': return 'Critical';
      case '2': return 'High';
      case '1': return 'Medium';
      default: return 'Low';
    }
  };

  // Risk color mapping
  const getRiskColor = (riskCode: string): 'destructive' | 'outline' | 'secondary' => {
    switch (riskCode) {
      case '3': 
      case '2': return 'destructive';
      case '1': return 'outline';
      default: return 'secondary';
    }
  };

  // Icon selection based on risk
  const getRiskIcon = (riskCode: string): React.ReactNode => {
    switch (riskCode) {
      case '3': return <ShieldAlert className="text-destructive mr-2" />;
      case '2': return <AlertTriangle className="text-destructive mr-2" />;
      case '1': return <Info className="text-warning mr-2" />;
      default: return null;
    }
  };

  // Filtering logic
  const filteredAlerts = useMemo(() => {
    return (data.site[0]?.alerts || []).filter(alert => {
      const severity = getRiskSeverity(alert.riskcode).toLowerCase();
      switch (severity) {
        case 'low': return filters.low;
        case 'medium': return filters.medium;
        case 'high': return filters.high;
        case 'critical': return filters.critical;
        default: return true;
      }
    });
  }, [data.site[0]?.alerts, filters]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredAlerts.length / itemsPerPage));
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Pagination handler
  const handlePageChange = (newPage: number) => {
    // Ensure new page is within bounds
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  // Handle row click to open modal
  const handleRowClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsCopied(false);
  };

  // Copy description to clipboard
  const handleCopyDescription = () => {
    if (selectedAlert) {
      // Remove HTML tags from description
      const cleanDescription = selectedAlert.desc.replace(/<[^>]*>/g, '');
      navigator.clipboard.writeText(cleanDescription).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  // Handle filter change
  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Vulnerability Report for {data.site[0]['@name']}
          {filteredAlerts.length === 0 && (
            <span className="ml-4 text-base text-muted-foreground">
              (No results found)
            </span>
          )}
        </h2>
        
        {/* Filter Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Risks
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Risk Levels</h4>
                <p className="text-sm text-muted-foreground">
                  Select which risk levels to display
                </p>
              </div>
              <div className="grid gap-2">
                {Object.entries(filters).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`filter-${key}`}
                      checked={value}
                      onCheckedChange={() => handleFilterChange(key as keyof typeof filters)}
                    />
                    <label
                      htmlFor={`filter-${key}`}
                      className="text-sm font-medium capitalize"
                    >
                      {key}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {filteredAlerts.length > 0 ? (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base font-extrabold">Vulnerability</TableHead>
                  <TableHead className="text-base font-extrabold">Risk Level</TableHead>
                  <TableHead className="text-base font-extrabold">Instances</TableHead>
                  <TableHead className="text-base font-extrabold">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAlerts.map((alert, index) => (
                  <TableRow 
                    key={index} 
                    onClick={() => handleRowClick(alert)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    <TableCell>
                      <div className="flex items-center">
                        {getRiskIcon(alert.riskcode)}
                        {alert.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskColor(alert.riskcode)}>
                        {getRiskSeverity(alert.riskcode)}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.count}</TableCell>
                    <TableCell>
                      <div 
                        className="text-sm text-muted-foreground max-w-[300px] truncate" 
                        title={alert.desc.replace(/<[^>]*>/g, '')}
                      >
                        {alert.desc.replace(/<[^>]*>/g, '').substring(0, 200)}
                        {alert.desc.length > 200 ? '...' : ''}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No vulnerabilities match the current filter criteria.
        </div>
      )}

      {/* Description Modal */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedAlert && getRiskIcon(selectedAlert.riskcode)}
              {selectedAlert?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={selectedAlert ? getRiskColor(selectedAlert.riskcode) : 'secondary'}>
                  {selectedAlert ? getRiskSeverity(selectedAlert.riskcode) : 'Unknown'}
                </Badge>
                <Button 
                  variant="outline" 
                  onClick={handleCopyDescription}
                  className="flex items-center gap-2"
                >
                  {isCopied ? (
                    <>
                      <CheckCheck className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Description
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-muted p-4 rounded-lg max-h-[400px] overflow-y-auto">
                <p dangerouslySetInnerHTML={{ 
                  __html: selectedAlert.desc 
                }} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultTable;