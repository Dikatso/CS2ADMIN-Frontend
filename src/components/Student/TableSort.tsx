import { useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons';
import { StudentEnquiryModal } from '../Shared/ViewEnquiryModal';
import { Enquiry } from '@/types/global';
import { useDisclosure } from '@chakra-ui/react';
import { StatusBadge } from '../Shared/StatusBadge';
import moment from 'moment';

const useStyles = createStyles((theme) => ({
  th: {
    padding: `0 !important`,
  },

  control: {
    width: `100%`,
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === `dark`
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

type RowData = Enquiry;

interface TableSortProps {
  data: RowData[];
  tableType: 'test' | 'assignment';
  view: 'student' | 'convener';
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return keys(data[0]).some((key) => {
      if (item[key] != null && key != `user`) {
        return item[key].toLowerCase().includes(query);
      }
    });
  });
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        if (sortBy != `user`) {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      }

      if (sortBy != `user`) {
        return a[sortBy].localeCompare(b[sortBy]);
      }
    }),
    payload.search,
  );
}

export function TableSort({ data, tableType, view }: TableSortProps) {
  const [search, setSearch] = useState(``);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry>();

  // update sorted data after invalidating fetchEnquiries
  useEffect(() => {
    setSortedData(data);
  }, [data]);
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value }),
    );
  };

  const rows = sortedData.map((row) => {
    return (
      <>
        <tr
          key={row.id}
          onClick={() => {
            onOpen();
            setSelectedEnquiry(row);
          }}
          style={{
            cursor: `pointer`,
          }}
        >
          <td>{row.id}</td>
          <td>{row.courseCode}</td>
          {tableType == `test` ? (
            <td>{row.testNo}</td>
          ) : (
            <td>{row.assignmentNo}</td>
          )}
          <td>{moment(row.createdAt).format(`lll`)}</td>
          <td>{moment(row.updatedAt).format(`lll`)}</td>
          <td>
            <StatusBadge enquiryStatus={row.status} size="md" />
          </td>
        </tr>
      </>
    );
  });

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: `fixed`, minWidth: 700 }}
        highlightOnHover
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === `id`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`id`)}
            >
              ID
            </Th>
            <Th
              sorted={sortBy === `courseCode`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`courseCode`)}
            >
              Course
            </Th>
            <Th
              sorted={
                sortBy === (tableType === `test` ? `testNo` : `assignmentNo`)
              }
              reversed={reverseSortDirection}
              onSort={() => {
                const value = tableType === `test` ? `testNo` : `assignmentNo`;
                setSorting(value);
              }}
            >
              {tableType === `test` ? `Test No.` : `Assign No.`}
            </Th>

            <Th
              sorted={sortBy === `createdAt`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`createdAt`)}
            >
              Date Submitted
            </Th>

            <Th
              sorted={sortBy === `updatedAt`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`updatedAt`)}
            >
              Date Updated
            </Th>

            <Th
              sorted={sortBy === `status`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`status`)}
            >
              Status
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={6}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {selectedEnquiry != null ? (
        <StudentEnquiryModal
          enquiry={selectedEnquiry}
          isOpen={isOpen}
          onClose={onClose}
          view={view}
        />
      ) : (
        <></>
      )}
    </ScrollArea>
  );
}
