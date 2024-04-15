-- From https://gist.github.com/fabiolimace/515a0440e3e40efeb234e12644a6a346

/*
 * MIT License
 *
 * Copyright (c) 2023-2024 Fabio Lima
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
 
/**
 * Returns a time-ordered with Unix Epoch UUID (UUIDv7).
 * 
 * Referencies:
 * - https://github.com/uuid6/uuid6-ietf-draft
 * - https://github.com/ietf-wg-uuidrev/rfc4122bis
 *
 * MIT License.
 *
 * Tags: uuid guid uuid-generator guid-generator generator time order rfc4122 rfc-4122
 */
create or replace function uuid7() returns uuid as $$
declare
begin
	return uuid7(clock_timestamp());
end $$ language plpgsql;

create or replace function uuid7(p_timestamp timestamp with time zone) returns uuid as $$
declare

	v_time numeric := null;

	v_unix_t numeric := null;
	v_rand_a numeric := null;
	v_rand_b numeric := null;

	v_unix_t_hex varchar := null;
	v_rand_a_hex varchar := null;
	v_rand_b_hex varchar := null;

	v_output_bytes bytea := null;

	c_milli_factor numeric := 10^3::numeric;  -- 1000
	c_micro_factor numeric := 10^6::numeric;  -- 1000000
	c_scale_factor numeric := 4.096::numeric; -- 4.0 * (1024 / 1000)
	
	c_version bit(64) := x'0000000000007000'; -- RFC-4122 version: b'0111...'
	c_variant bit(64) := x'8000000000000000'; -- RFC-4122 variant: b'10xx...'

begin

	v_time := extract(epoch from p_timestamp);

	v_unix_t := trunc(v_time * c_milli_factor);
	v_rand_a := ((v_time * c_micro_factor) - (v_unix_t * c_milli_factor)) * c_scale_factor;
	v_rand_b := random()::numeric * 2^62::numeric;

	v_unix_t_hex := lpad(to_hex(v_unix_t::bigint), 12, '0');
	v_rand_a_hex := lpad(to_hex((v_rand_a::bigint::bit(64) | c_version)::bigint), 4, '0');
	v_rand_b_hex := lpad(to_hex((v_rand_b::bigint::bit(64) | c_variant)::bigint), 16, '0');

	v_output_bytes := decode(v_unix_t_hex || v_rand_a_hex || v_rand_b_hex, 'hex');

	return encode(v_output_bytes, 'hex')::uuid;
	
end $$ language plpgsql;
