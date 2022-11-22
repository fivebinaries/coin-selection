# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [2.1.0] - 2022-11-22

### Fixed

- occasionally too low fee while using `setMax` on token output
- order of inputs returned in txPlan did not always match the order of inputs in constructed transaction CBOR

### Changed

- Upgraded deps, cardano-serialization-lib to babbage-compatible release (v11)

## [2.0.0] - 2022-02-14

### Added

- Initial release
